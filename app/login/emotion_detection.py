from unicodedata import name
from imutils.video import WebcamVideoStream, FPS
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
from PIL import Image
from auth.settings import BASE_DIR
from sys import platform
import dlib
from tensorflow import keras
from keras import optimizers, regularizers
from keras import layers, models
from .models  import UsersMood



class Emotion_detection(object):
    def __init__(self,name):
        self.vs = WebcamVideoStream(src=0).start()
        self.fps = FPS().start()
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor(str(BASE_DIR / 'shape_predictor_68_face_landmarks.dat'))
        self.model = keras.models.load_model('my_model.h5')
        self.list_categories = ['anger', 'disgust', 'happy','neutral', 'sadness', 'surprise']
        self.score=[0,0,0,0,0,0]
        self.name=name

    def __del__(self):
        cv2.destroyAllWindows()
        self.vs.stream.release()

    def get_frame(self):

        frame = self.vs.read()

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        faces = self.detector(frame)
        try:
            if len(faces)!= 0:
                for face in faces:
                    x1 = face.left()
                    y1 = face.top()
                    x2 = face.right()
                    y2 = face.bottom()
                    img_f = gray[y1:y2,x1:x2]


                img = cv2.resize(img_f, (48, 48))
                img = img.reshape(1, 48, 48, 1)
                prediction_result = self.model(img)[0]
                
                index=np.argmax(prediction_result)
                self.score[index]+=1
                
                Cmood=self.list_categories[
                    self.score.index(
                        max(self.score))]
                UsersMood.objects.update_or_create(username=self.name,defaults={"mood":Cmood})
                
                cv2.rectangle(frame, (x1, y1), (x2 , y2),(0,255,0), 2)
                cv2.putText(frame,self.list_categories[index],(10, 120), cv2.FONT_HERSHEY_PLAIN, 1, (255,255,255), 1)
        except:
            return None

        self.fps.update()
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()

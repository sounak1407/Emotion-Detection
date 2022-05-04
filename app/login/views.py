import imp
from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import pandas as pd
from auth.settings import BASE_DIR
from login.models import UsersMood
from .forms import CreateUserForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import StreamingHttpResponse
from login.emotion_detection import Emotion_detection
from rest_framework.views import APIView
from rest_framework.response import Response
from thought_feed import views
# Create your views here.


def indexView(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request,'home.html')

def aboutView(request):
    return render(request,'aboutus.html') 

@login_required(login_url='login_url') 
def thoughtFeed(request):
    return views.index(request)


@login_required(login_url='login_url')  
def dashboardView(request):
    return render(request,'dashboard.html') 

@login_required(login_url='login_url')  
def testView(request):
    return render(request,'test.html')     

def registerView(request): 
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        form = CreateUserForm()
        if request.method == "POST" :
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                messages.success(request, 'Account Created Succesfully!')
                return redirect('login_url')

        context = {'form' :form}
        return render(request,'register.html',context) 



def loginView(request): 
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        if request.method == "POST" :
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request,user)
                return redirect('dashboard')
            else:
                messages.info(request, 'Username or Password is Incorrect!')
        
        context ={}

        return render(request,'login.html',context)
        
def logoutView(request): 
    logout(request)
    return redirect('login_url')


global a


def facecam_feed(request):
    try:
        global a
        a=Emotion_detection(request.user)

        return StreamingHttpResponse(gen(a), content_type="multipart/x-mixed-replace;boundary=frame")
    except: 
        pass



def gen(camera):
 
    
    while True:
        frame = camera.get_frame()
        
        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

              
def stopFeed(request):
    global a
    a.vs.stream.release()
    return render(request,'dashboard.html')

def recSongs(request):
    songs=[]
    url=[]
    num=[]
    usrMood=UsersMood.objects.get(username=request.user).mood
    userMoodFile="data/"+usrMood+".pkl" 
    print("USER'S MOOD IS "+usrMood)
    numb=1
    pklFile=str(BASE_DIR / userMoodFile)
    df=pd.read_pickle(pklFile)
    for i in df.sample(5).index:
        songs.append(df["name"][i])
        url.append(df["url"][i])
        num.append(numb)
        numb+=1
    zipped=zip(songs,url)
    return render(request,'recommendedSongs.html',{"songs":zipped,"num":num})
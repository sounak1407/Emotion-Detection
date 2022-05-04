import imp
import json
from urllib import response
import requests
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
from thought_feed import views
# from yturl.py import getYTURL
# Create your views here.


def indexView(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request,'home.html')

def aboutView(request):
    return render(request,'aboutus.html') 

def newBase(request):
    return render(request,'new_base.html') 


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
    
        response = redirect('dashboard')
        return response
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
        
        
        response =render(request,'login.html')
        
        return response
        
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



def getYTURL(topic):
    url = f"https://www.youtube.com/results?q={topic}"
    count = 0
    cont = requests.get(url)
    data = cont.content
    data = str(data)
    lst = data.split('"')
    for i in lst:
        count += 1
        if i == "WEB_PAGE_TYPE_WATCH":
            break
    if lst[count - 5] == "/results":
        raise Exception("No Video Found for this Topic!")
    return f"https://www.youtube.com{lst[count - 5]}"

def recSongs(request):
    songs=[]
    url=[]
    num=[]
    vid=[]
    # usrMood = "neutral"
    usrMood=UsersMood.objects.get(username=request.user).mood
   
    userMoodFile="data/"+usrMood+".pkl" 
    print("USER'S MOOD IS "+usrMood)
    numb=1
    pklFile=str(BASE_DIR / userMoodFile)
    df=pd.read_pickle(pklFile)

    indexes = df.sample(15).index
    f_indexes = []
    for i in indexes:
        if type(df['name'][i]) == str and len(f_indexes)<5:
            f_indexes.append(i)


    for i in f_indexes:
        songs.append(df["name"][i])
        # print(df['name'])
        url.append(df["url"][i])
        # print(df["url"][i])
        yt=getYTURL(df["name"][i]+" "+df['artists_song'][i])
        vid.append(yt)
        # print(yt)
        num.append(numb)
        numb+=1
    print(songs)
    zipped=zip(songs,url,vid)
    return render(request,'recommendedSongs.html',{"songs":zipped,"num":num})

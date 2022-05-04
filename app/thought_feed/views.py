import json
from urllib import response
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url='login_url')  
def index(request, *args, **kwargs):
    response=render(request, 'thought_feed/index.html')
    response.set_cookie("uname", json.dumps({"name":str(request.user)}),max_age=None)
    return response

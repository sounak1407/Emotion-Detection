from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

global username
@login_required(login_url='login_url')  
def index(request, *args, **kwargs):
    global username
    username=request.user
    return render(request, 'thought_feed/index.html')

class ReactView(APIView):
    def get(self, request):
        global username
        detail =  {"name": str(username)}
        return Response(detail)
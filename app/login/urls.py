from django.urls import path,include
from . import views 

urlpatterns =  [
    path('',views.indexView,name="home"),
    path('thought/',views.thoughtFeed,name="thought"),
    path('aboutus/',views.aboutView,name="about"),
    path('dashboard/',views.dashboardView,name="dashboard"),
    path('login/',views.loginView,name="login_url"),
    path('register/',views.registerView,name="register_url"),
    path('logout/',views.logoutView,name="logout"), 
    path('facecam_feed',views.facecam_feed,name="facecam_feed"),
    path('stopFeed',views.stopFeed,name="stopFeed"),
    path('recommendSongs/',views.recSongs,name="recommendSongs"),
    path('new_base/',views.newBase,name='newBase')

   
    # path('disableCamera/', views.disableCamera, name='disableCamera'),
]
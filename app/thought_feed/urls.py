from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('wel/', views.ReactView.as_view(), name="restapi"),
]
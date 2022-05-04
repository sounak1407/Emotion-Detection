from tkinter.tix import Tree
from django.db import models

# Create your models here.
class UsersMood(models.Model):
        # fields of the model
    username = models.CharField(max_length = 20,primary_key=True)
    mood=models.CharField(max_length=10)
import torch
import torch.nn as nn
import torch.nn.functional as F
import pathlib
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torchvision
import glob
from torch.autograd import Variable
from torch.optim import Adam
from torchvision.transforms import transforms
from torch.utils.data import DataLoader

# CNN Network
class Net(nn.Module):
    
    def __init__(self, num_categories=7):
        super(Net, self).__init__()
        
        # layer 1
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=6, kernel_size=5, padding=2)
        self.relu1 = nn.ReLU()
        # reduction by factor of 2 in dimensions
        # TODO: find out about other sizes and strides
        self.maxpool1 = nn.MaxPool2d(kernel_size=(2,2), stride=2)
        
        # layer 2
        self.conv2 = nn.Conv2d(in_channels=6, out_channels=12, kernel_size=5, padding=2)
        self.relu2 = nn.ReLU()
        self.maxpool2 = nn.MaxPool2d(kernel_size=(2,2), stride=2)
        
        # layer 3
        self.conv3 = nn.Conv2d(in_channels=12, out_channels=18, kernel_size=5, padding=2)
        self.relu3 = nn.ReLU()
        
        # layer 4
#         self.conv4 = nn.Conv2d(in_channels=18, out_channels=36, kernel_size=3, padding=1)
#         self.relu4 = nn.ReLU()
        
        # 48 -> 24 -> 12
        # 32 channels x (12 x 12) image dimensions
        # 32 x 12 x 12
        
        self.fc1 = nn.Linear(18 * 12 * 12, 120)
        self.dropout1 = nn.Dropout2d(p = 0.05)

        self.relufc1 = nn.ReLU()
        
        self.fc2 = nn.Linear(120, 80)
#         self.dropout2 = nn.Dropout2d(p = 0.40)
        self.relufc2 = nn.ReLU()
        
        self.fc3 = nn.Linear(80, num_categories)
        
    def forward(self, X):
        
        X = self.conv1(X)
        X = self.relu1(X)
        X = self.maxpool1(X)
        
        X = self.conv2(X)
        X = self.relu2(X)
        X = self.maxpool2(X)
        
        X = self.conv3(X)
        X = self.relu3(X)
        
#         X = self.conv4(X)
#         X = self.relu4(X)
        
        X = torch.flatten(X, 1)
        
        X = self.fc1(X)
        X = self.dropout1(X)
        X = self.relufc1(X)
        
        X = self.fc2(X)
#         X = self.dropout2(X)
        X = self.relufc2(X)
        
        output = self.fc3(X)
        
        return output
from rest_framework import generics
from .models import Participant, Task
from .serializers import ParticipantSerializer, TaskSerializer
import logging
from django.db import connection


# Create your views here.
class ParticipantsList(generics.ListCreateAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()
       
    
class ParticipantsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ParticipantSerializer
    queryset = Participant.objects.all()
    
class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        logging.debug(connection.queries)  # Log the SQL queries
        return response
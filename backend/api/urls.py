# urls.py in your Django app
from django.urls import path
from .views import ParticipantsList, ParticipantsDetail, TaskList, TaskDetail

urlpatterns = [
    path('tasks/', TaskList.as_view(), name='task_list'),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task_detail'),
    path('participants/', ParticipantsList.as_view(), name='participants_list'),
    path('participants/<int:pk>/', ParticipantsDetail.as_view(), name='participant_detail'),
]

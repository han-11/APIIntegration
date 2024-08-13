from rest_framework import serializers
from .models import Participant, Task

class ParticipantSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # To include tasks in the participant

    class Meta:
        model = Participant
        fields = ['id', 'first_name', 'last_name', 'email', 'tasks']  # Include tasks if you want to show them with participants

class TaskSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)  # Nested serializer to show participant details
    participant_id = serializers.PrimaryKeyRelatedField(
        queryset=Participant.objects.all(),
        source='participant',
        write_only=True
    )  # This allows you to send a participant ID from the frontend

    class Meta:
        model = Task
        fields = ['id', 'name', 'due_date', 'completed', 'participant', 'participant_id']


from django.db import models

# Create your models here.
class Participant(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Task(models.Model):
    name = models.CharField(max_length=255)
    due_date = models.DateField()
    completed = models.BooleanField(default=False)
    participant = models.ForeignKey(Participant, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

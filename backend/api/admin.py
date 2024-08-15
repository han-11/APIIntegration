from django.contrib import admin
from .models import Participant, Task

# Register the models with the Django admin
admin.site.register(Participant)
admin.site.register(Task)
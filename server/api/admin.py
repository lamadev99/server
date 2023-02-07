from django.contrib import admin
from api.models import *

# Register your models here.
admin.site.register(News)
admin.site.register(Comment)
admin.site.register(Count)
admin.site.register(Writer)
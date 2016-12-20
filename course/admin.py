from django.contrib import admin
from .models import Course, Tutor

# Register your models here.
class CourseAdmin(admin.ModelAdmin):
    pass
admin.site.register(Course, CourseAdmin)

class TutorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Tutor, TutorAdmin)

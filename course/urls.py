from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^searchCourse', views.CourseDetail.as_view()),
    url(r'^listCourses', views.CourseList.as_view()),
    url(r'^addCourse', views.AddCourse.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml'])

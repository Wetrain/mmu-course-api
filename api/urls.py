from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^courses/$', views.CourseList.as_view()),
    url(r'^courses/(?P<pk>[0-9]+)/$', views.CourseDetail.as_view()),
    url(r'^tutors/$', views.TutorList.as_view()),
    url(r'^tutors/(?P<pk>[0-9]+)/$', views.TutorDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml', 'text'])

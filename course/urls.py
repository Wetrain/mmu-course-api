from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^searchCourse', views.SearchCourse.as_view()),
    url(r'^listCourses', views.CourseList.as_view()),
    url(r'^addCourse', views.AddCourse.as_view()),
    url(r'^searchTutor', views.TutorDetail.as_view()),
    url(r'^listTutors', views.TutorList.as_view()),
    url(r'^addTutor', views.AddTutor.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'xml', 'text'])

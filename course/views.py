from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from django.views.generic import TemplateView

from api.serializers import CourseSerializer, TutorSerializer
from .models import Course, Tutor
from .forms import CreateCourseForm, SearchForm, UpdateCourseForm

class CourseManageView(TemplateView):
    template_name = 'pages/manage.html' 

    def get_context_data(self, **kwargs):
        context  = super(CourseManageView, self).get_context_data(**kwargs)
        context['SearchCourseForm'] = SearchForm
        context['UpdateCourseForm'] = UpdateCourseForm
        return context


class CourseCreateView(TemplateView):
    template_name = 'pages/create-page.html' 

    def get_context_data(self, **kwargs):
        context  = super(CourseCreateView, self).get_context_data(**kwargs)
        context['CreateCourseForm'] = CreateCourseForm
        return context


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SearchCourse(APIView):

    def get(self, request, format=None):
        try:
            courses = Course.objects.filter(name__icontains=request.GET['name'])
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCourse(APIView):

    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TutorList(generics.ListCreateAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer


class TutorDetail(APIView):

    def get(self, request, format=None):
        try:
            tutor = Tutor.objects.get(name=request.GET['name'])
        except Tutor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TutorSerializer(tutor)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddTutor(APIView):

    def post(self, request, format=None):
        serializer = TutorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

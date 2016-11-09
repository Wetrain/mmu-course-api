from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from api.serializers import CourseSerializer 
from .models import Course


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetail(APIView):
    def get(self, request, format=None):
        try:
            course = Course.objects.get(name=request.GET['name'])
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND) 
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddCourse(APIView):
    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Updatecourse(APIView):

    def put(self, request, format=None):
        try:
            course = Course.objects.get(name=name)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



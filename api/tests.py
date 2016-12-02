from rest_framework.test import APIRequestFactory
from django.test import TestCase
from .views import CourseList, CourseDetail
from course.models import Course, Tutor
import json, xml, datetime

class CourseTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
    
    def test_json_course_create(self):
        """
        Ensure we can create a basic course object
        """
        view = CourseList.as_view()
        request = self.factory.post('/api/courses/', json.dumps({"name":"maths","credits":100,"duration":"459 00:00:00","tutor":[{"name":"nick","room":"","school":"","email":"a@c.com"}],"about":"maths stuff"}), content_type='application/json')
        response = view(request)
        response.render()
        self.assertEqual(response.content.decode('utf8'), '{"id":1,"name":"maths","credits":100,"duration":"459 00:00:00","tutor":[{"id":1,"name":"nick","room":"","school":"","email":"a@c.com"}],"about":"maths stuff"}')

def test_xml_course_create(self):
        """
        Ensure we can create a basic course object
        """
        duration = datetime.timedelta(weeks=30)
        tutor = Tutor.objects.create(name="nick", email="a@c.com")
        post_data = {"name":"maths",
                    "credits": 100,
                    "duration": duration,
                    "tutor": tutor,
                    "about": "maths stuff"}
        view = CourseList.as_view()
        request = self.factory.post('/api/courses/', json.dumps({"name":"maths","credits":100,"duration":"459 00:00:00","tutor":[{"name":"nick","room":"","school":"","email":"a@c.com"}],"about":"maths stuff"}), content_type='application/json')
        response = view(request)
        response.render()
        self.assertEqual(response.content.decode('utf8'), '{"id":1,"name":"maths","credits":100,"duration":"459 00:00:00","tutor":[{"id":1,"name":"nick","room":"","school":"","email":"a@c.com"}],"about":"maths stuff"}')

    def test_course_detail(self):
        """
        Ensure we retrieve the correct course info
        """
        tutor = Tutor.objects.create(name="nick", email="a@c.com")
        tutor.save()
        duration = datetime.timedelta(weeks=30)
        course = Course.objects.create(name="programming-advanced", credits=100, duration=duration, about="hello")
        course.tutor.add(tutor)
        course.save()

        view = CourseDetail.as_view()
        request = self.factory.get('/api/courses/{}/'.format(course.pk))
        response = view(request, pk=course.pk)
        response.render()
        self.assertEqual(response.data['id'], course.pk)
    
   
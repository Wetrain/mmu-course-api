from django.forms import ModelForm
from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

from .models import Course

class CreateCourseForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(CreateCourseForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.disable_csrf = True
        self.helper.form_id = 'create-course-form'
        self.helper.form_method = 'post'
        self.helper.form_action = '/api/courses/'
        self.helper.add_input(Submit('create-course-button','Create Course'))

    class Meta:
        model = Course
        fields = '__all__'

class UpdateCourseForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(UpdateCourseForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.disable_csrf = True
        self.helper.form_id = 'update-course-form'
        self.helper.form_action = '/api/courses/'
        self.helper.add_input(Submit('update-course-button','Update Course'))

    class Meta:
        model = Course
        fields = '__all__'

class SearchForm(forms.Form):

    def __init__(self, *args, **kwargs):
        super(SearchForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.disable_csrf = True
        self.helper.form_id = 'search-course-form'
        self.helper.form_method = 'get'
        self.helper.form_action = '/http/searchCourse'
        self.helper.add_input(Submit('search-course-button','SEARCH COURSES'))

    course_name = forms.CharField(max_length=200)
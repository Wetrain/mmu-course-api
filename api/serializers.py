from rest_framework import serializers
from rest_framework.fields import EmailField
from course.models import Course, Tutor

class TutorSerializer(serializers.ModelSerializer):
    
    email = EmailField(allow_blank=True, max_length=254, required=False)

    class Meta:
        model = Tutor
        fields = ('id', 'name', 'room', 'school', 'email')

class CourseSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Course
        fields = ('id', 'name', 'credits', 'duration', 'tutor', 'about')

    tutor = TutorSerializer(many=True)

    def create(self, validated_data):
        tutors_data = validated_data.pop("tutor")
        course = Course.objects.create(**validated_data)
        print('foo')
        for tutor_data in tutors_data:
            try:
                tutor = Tutor.objects.get(email=tutor_data['email'])
                course.tutor.add(tutor)
            except Tutor.DoesNotExist:
                tutor = Tutor.objects.create(**tutor_data)
                course.tutor.add(tutor)
        return course

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.credits = validated_data.get("credits", instance.credits)
        instance.duration = validated_data.get("duration", instance.duration)
        instance.about = validated_data.get("about", instance.about)
        tutors_data = validated_data.pop("tutor")

        for tutor_data in tutors_data:
            try:
                tutor = Tutor.objects.get(email=tutor_data['email'])
                instance.tutor.add(tutor)
            except Tutor.DoesNotExist:
                tutor = Tutor.objects.create(**tutor_data)
                instance.tutor.add(tutor)
        return instance




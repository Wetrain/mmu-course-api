from django.db import models


class Tutor(models.Model):
    name = models.CharField(max_length=200, null=False)
    room = models.CharField(max_length=100, blank=True)
    school = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True, unique=True)

    def __str__(self):
        return "{0}".format(self.email)


class Course(models.Model):
    name = models.CharField(max_length=200, null=False, unique=True)
    credits = models.PositiveIntegerField(null=False)
    duration = models.DurationField(null=False)
    tutor = models.ManyToManyField(Tutor)
    about = models.TextField(blank=True)

    def __str__(self):
        return "{0}".format(self.name)

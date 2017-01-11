enterprise_course_api
=====================

This is a Django/Python based HTTP and Restful API built for my Enterprise Programming course at university.

The project also has a jQuery UI and is hosted the Heroku web hosting platform [Here](https://aqueous-shore-75997.herokuapp.com) 

:License: MIT

#Configuration

Local
--------
The following requirments are needed to run the application locally and this has been testec on Both Mac and Linux distributions.


* [Python 3](https://www.python.org/downloads/) 
* [PostgresSQL](https://www.postgresql.org/download/)
* [VirtualEnvWrapper](https://virtualenvwrapper.readthedocs.io/en/latest/install.html)

To download and configure the application files, simply clone this repository and then run the following commands:

To configure the virtualenv:
```sh
$ pip install virtualenvwrapper
$ mkvirtualenv *yourenvname*
$ workon *yourenvname*
```

To configure the database:
```sh
$ psql
$ create database enterprise_course_api
```

To configure django:
```sh
$ cd enterprise_course_api
$ pip install -r requirments/requirments.txt
```

To set up the database:
```sh
$ cd enterprise_course_api
$ python manage.py makemigrations
$ python manage.py migrate
```

* To create an **superuser account**, use this command via the command line::

    $ python manage.py createsuperuser

Then follow the onscreen prompt to create a super user.

To launch the application:
```sh
$ cd enterprise_course_api
$ python manage.py runserver
```

Test coverage
--------

To run the tests::

    $ pythonmanage.py test

#Deployment

The following details how to deploy this application.


Heroku
--------

See detailed `cookiecutter-django Heroku documentation`_.

.. _`cookiecutter-django Heroku documentation`: http://cookiecutter-django.readthedocs.io/en/latest/deployment-on-heroku.html




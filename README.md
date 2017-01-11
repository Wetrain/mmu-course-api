enterprise_course_api
=====================

This is a Django/Python based HTTP and Restful API built for my Enterprise Programming course at university.

**Student ID: 13121281**

The project also has a jQuery UI and is hosted the Heroku web hosting platform [Here](https://aqueous-shore-75997.herokuapp.com) 

#Configuration

Local
--------
The following requirments are needed to run the application locally and this has been tested on Both Mac and Linux distributions.


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

To create the database:
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

To create a superuser account, use this command via the command line:
```sh
$ python manage.py createsuperuser
```
Then follow the onscreen prompt to create a super user.

To launch the application:
```sh
$ cd enterprise_course_api
$ python manage.py runserver
```

Test coverage
--------

To run the tests::

    $ python manage.py test

#Deployment

To deploy the application to Heroku, you must first creat an account at [Heroku](https://www.heroku.com/home)

Then install the Heroku Toolbelt [Here](https://devcenter.heroku.com/articles/heroku-cli)

Then configure the settings outlined here:
```sh
heroku create --buildpack https://github.com/heroku/heroku-buildpack-python

heroku addons:create heroku-postgresql:hobby-dev
heroku pg:backups schedule --at '02:00 America/Los_Angeles' DATABASE_URL
heroku pg:promote DATABASE_URL

heroku addons:create mailgun

heroku config:set DJANGO_ADMIN_URL="$(openssl rand -base64 32)"
heroku config:set DJANGO_SECRET_KEY="$(openssl rand -base64 64)"
heroku config:set DJANGO_SETTINGS_MODULE='config.settings.production'
heroku config:set DJANGO_ALLOWED_HOSTS='.herokuapp.com'

heroku config:set DJANGO_MAILGUN_API_KEY=pubkey-0f4919d2e64610e15b8b9190cde539b8 
heroku config:set MAILGUN_SENDER_DOMAIN=mg.my-mmu-domain.com

heroku config:set PYTHONHASHSEED=random
heroku config:set DJANGO_ADMIN_URL=\^admin/

git push heroku master
heroku run python manage.py migrate
heroku run python manage.py check --deploy
heroku run python manage.py createsuperuser
heroku open
```




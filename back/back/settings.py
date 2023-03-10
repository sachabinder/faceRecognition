"""
Django settings for back project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""


import os
import environ

from pathlib import Path
from corsheaders.defaults import default_headers

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG", default=False)

if DEBUG:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1", "back", "testserver"]
else:
    ALLOWED_HOSTS = [env("DOMAIN_NAME", default="localhost")]

# SECURITY WARNING: keep the secret key used in production secret!
if DEBUG:
    SECRET_KEY = "django-insecure-2-e3q#*pqsgm+lhrgrkc=ex%!^8(3^*6@q^367*ma4j1$=54$f"
else:
    SECRET_KEY = env("SECRET_KEY", default=None)
    SECURE_SSL_REDIRECT = env("SECURE_SSL_REDIRECT", default=False)
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# Application definition

CORE_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "rest_framework",
    "corsheaders",
]

THIRD_PARTY_APPS = [
    "django_cleanup.apps.CleanupConfig",
]

PROJECT_APPS = [
    "api.apps.ApiConfig",
]

INSTALLED_APPS = CORE_APPS + THIRD_PARTY_APPS + PROJECT_APPS


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "back.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "back.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ["DB_HOST"],
        "PORT": os.environ["DB_PORT"],
        "NAME": os.environ["DB_NAME"],
        "USER": os.environ["DB_USER"],
        "PASSWORD": os.environ["DB_PASSWORD"],
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "fr-fr"

TIME_ZONE = "Europe/Paris"

USE_I18N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-url
# Actual directory user files go to
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# URL used to access the media
MEDIA_URL = "/media/"
PROFILE_PICTURES_FOLDER = "profile_picture/"

# Temp files
FILE_UPLOAD_HANDLERS = ("django.core.files.uploadhandler.TemporaryFileUploadHandler",)


# DeepFace Config
FACE_DETECTION_MODEL_NAME = env("FACE_DETECTION_MODEL_NAME", default="VGG-Face")
FACE_DETECTION_DISTANCE_METRIC = env("FACE_DETECTION_DISTANCE_METRIC", default="cosine")
FACE_DETECTION_DETECTOR_BACKEND = env(
    "FACE_DETECTION_DETECTOR_BACKEND", default="opencv"
)

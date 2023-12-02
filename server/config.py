import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))


# This class is created to prepare configs
class Config:
    user = 'root'
    password = 'inrixhack'
    database = 'django_db'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@127.0.0.1:3306/%s' % (user, password, database)

    @staticmethod
    def init_app(app):
        pass


# Development Database URL is configured here.
class DevelopmentConfig(Config):
    DEBUG = True
    user = 'root'
    password = 'inrixhack'
    database = 'django_db'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@127.0.0.1:3306/%s' % (user, password, database)
    # WTF_CSRF_ENABLED = False
    # Handle with browser not updating automatically
    SEND_FILE_MAX_AGE_DEFAULT = timedelta(seconds=2)


# Testing Database URL is configured here.
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
                              'sqlite://'


# Production Database URL is configured here.
class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'data.sqlite')


# config dictionary registered different environments(use development as default)
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
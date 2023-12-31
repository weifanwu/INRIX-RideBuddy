import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))


# This class is created to prepare configs
class Config:
    user = 'admin'
    # password = 'inrixhack'
    password = 'Peter12345'
    database = 'RideBudyDB'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@database-2.cguewozep1hd.us-east-1.rds.amazonaws.com:3306/%s' % (
    user, password, database)

    @staticmethod
    def init_app(app):
        pass


# Development Database URL is configured here.
class DevelopmentConfig(Config):
    DEBUG = True

    user = 'admin'
    # password = 'inrixhack'
    password = 'Peter12345'
    database = 'RideBudyDB'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@database-2.cguewozep1hd.us-east-1.rds.amazonaws.com:3306/%s' % (
        user, password, database)

    # WTF_CSRF_ENABLED = False
    # Handle with browser not updating automatically
    SEND_FILE_MAX_AGE_DEFAULT = timedelta(seconds=2)


# Testing Database URL is configured here.
class TestingConfig(Config):
    TESTING = True

    user = 'admin'
    # password = 'inrixhack'
    password = 'Peter12345'
    database = 'RideBudyDB'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@database-2.cguewozep1hd.us-east-1.rds.amazonaws.com:3306/%s' % (
        user, password, database)


# Production Database URL is configured here.
class ProductionConfig(Config):
    user = 'admin'
    # password = 'inrixhack'
    password = 'Peter12345'
    database = 'RideBudyDB'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@database-2.cguewozep1hd.us-east-1.rds.amazonaws.com:3306/%s' % (
        user, password, database)


# config dictionary registered different environments(use development as default)
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

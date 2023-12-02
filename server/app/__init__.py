from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import config


db = SQLAlchemy()


def create_app(cfg_type: str):
    """
    Do initlization for flask application

    :param cfg_type: a string with content ('dev', 'test', 'release')
    :return: app: flask application to run
    """
    app = Flask(__name__)
    app.config.from_object(config[cfg_type])
    config[cfg_type].init_app(app)
    db.init_app(app)
    CORS(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # from .auth import auth as auth_blueprint
    # app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
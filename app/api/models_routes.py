from flask import Blueprint, jsonify, request
from app.models import User, Character, db, Stat, PixelArtModel
from flask_login import login_required, current_user


models_routes = Blueprint("models", __name__)


@models_routes.route("/all")
def get_all_models():
    """gets all models"""

    models = PixelArtModel.query.all()

    # print("models=--------->", models)

    serialized_models = [model.to_dict() for model in models]

    # Return the list of serialized models as JSON
    return jsonify(serialized_models)

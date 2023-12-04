from flask import Blueprint, jsonify, request
from app.models import User, Character, db, Stat
from flask_login import login_required, current_user


character_routes = Blueprint("character", __name__)


@character_routes.route("/new", methods=["POST"])
@login_required
def create_new_character():
    """creates new character"""

    data = request.json

    if not all(key in data for key in ["name", "model_id"]):
        return jsonify({"error": "Missing required fields"}), 400

    new_character = Character(
        creator_id=current_user.id,
        model_id=data["model_id"],
        name=data["name"],
    )

    db.session.add(new_character)
    db.session.commit()

    new_stat = Stat(character_id=new_character.id)

    db.session.add(new_stat)
    db.session.commit()

    return new_character.to_dict()


@character_routes.route("/<int:character_id>")
@login_required
def get_character_details(character_id):
    """Gets character details by character_id"""

    character = Character.query.get(character_id)

    if not character:
        return jsonify({"error": "Character not found"}), 404

    if current_user.id != character.creator_id:
        return jsonify({"error": "User not authorized"}), 403

    return jsonify(character.to_dict())


@character_routes.route("/<int:character_id>/edit", methods=["PUT"])
@login_required
def edit_character(character_id):
    """Edit character details based on character_id"""

    character = Character.query.get(character_id)

    if not character:
        return jsonify({"error": "Character not found"}), 404

    if current_user.id != character.creator_id:
        return jsonify({"error": "User not authorized"}), 403

    data = request.json
    # print(data)
    character.name = data.get("name", character.name)
    character.model_id = data.get("model_id", character.model_id)

    db.session.commit()

    return jsonify(character.to_dict())


@character_routes.route("/<int:character_id>/delete", methods=["DELETE"])
@login_required
def delete_character(character_id):
    character = Character.query.get(character_id)

    if character:
        if current_user.id != character.creator_id:
            return jsonify({"error": "User not authorized"}), 403

        db.session.delete(character)
        db.session.commit()
        return {"message": "Character successfully deleted"}
    else:
        return {"error": "Character not found"}, 404

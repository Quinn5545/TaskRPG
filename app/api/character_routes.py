from flask import Blueprint, jsonify, request
from app.models import User, Character, db, Stat
from flask_login import login_required, current_user


character_routes = Blueprint("character", __name__)


@character_routes.route("/new", methods=["POST"])
@login_required
def create_new_character():
    """creates new character"""

    existing_character = Character.query.filter_by(creator_id=current_user.id).first()
    if existing_character:
        return jsonify({"error": "User already has a character"}), 400

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


@character_routes.route("/<int:creator_id>")
@login_required
def get_character_details(creator_id):
    """Gets character details by creator_id"""

    character = Character.query.filter_by(creator_id=creator_id).first()

    if not character:
        return jsonify({"error": "Character not found"}), 404

    if current_user.id != character.creator_id:
        return jsonify({"error": "User not authorized"}), 403

    return jsonify(character.to_dict())


@character_routes.route("/all")
@login_required
def get_all_characters():
    """Gets all characters for leaderboard"""

    characters = Character.query.all()

    # print("chars----->", characters)

    if not characters:
        return jsonify({"error": "Character not found"}), 404

    # Convert the characters to a list of dictionaries
    characters_list = [character.to_dict() for character in characters]

    return jsonify(characters_list)


@character_routes.route("/<int:creator_id>/edit", methods=["PUT"])
@login_required
def edit_character(creator_id):
    """Edit character details based on creator_id"""

    character = Character.query.filter_by(creator_id=creator_id).first()

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


@character_routes.route("/<int:creator_id>/delete", methods=["DELETE"])
@login_required
def delete_character(creator_id):
    character = Character.query.filter_by(creator_id=creator_id).first()

    if character:
        if current_user.id != character.creator_id:
            return jsonify({"error": "User not authorized"}), 403

        db.session.delete(character)
        db.session.commit()
        return character.to_dict()
    else:
        return {"error": "Character not found"}, 404


@character_routes.route("/<int:creator_id>/xp_add", methods=["PUT"])
@login_required
def add_xp_character(creator_id):
    """Add XP to character"""

    character = Character.query.filter_by(creator_id=creator_id).first()

    # print("char---->", character)

    if not character:
        return jsonify({"error": "Character not found"}), 404

    if current_user.id != character.creator_id:
        return jsonify({"error": "User not authorized"}), 403

    data = request.json
    # print("data----->", data)

    try:
        xp_to_add = int(data.get("xp", 0))
    except ValueError:
        return jsonify({"error": "Invalid XP value"}), 400

    if xp_to_add < 0:
        return jsonify({"error": "XP to add must be non-negative"}), 400

    character.xp += xp_to_add

    level_threshold = 10
    while character.xp >= level_threshold:
        character.xp -= level_threshold
        character.level += 1
        level_threshold += 10

    db.session.commit()

    return jsonify(character.to_dict())


# @character_routes.route("/<int:character_id>/xp_subtract", methods=["PUT"])
# @login_required
# def subtract_xp_character(character_id):
#     """Subtract XP from character"""

#     character = Character.query.get(character_id)

#     if not character:
#         return jsonify({"error": "Character not found"}), 404

#     if current_user.id != character.creator_id:
#         return jsonify({"error": "User not authorized"}), 403

#     data = request.json

#     try:
#         xp_to_subtract = int(data.get("xp", 0))
#     except ValueError:
#         return jsonify({"error": "Invalid XP value"}), 400

#     if xp_to_subtract < 0:
#         return jsonify({"error": "XP to subtract must be non-negative"}), 400

#     if xp_to_subtract > character.xp:
#         return jsonify({"error": "Cannot subtract more XP than character has"}), 400

#     character.xp -= xp_to_subtract

#     # Update level every 10 XP lost
#     level_threshold = 10
#     while character.xp < 0:
#         character.xp += level_threshold
#         character.level -= 1
#         level_threshold += 10

#     db.session.commit()

#     return jsonify(character.to_dict())

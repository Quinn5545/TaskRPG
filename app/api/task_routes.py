from datetime import datetime
from flask import Blueprint, jsonify, request
from app.models import User, Character, db, Stat, Task
from flask_login import login_required, current_user


task_routes = Blueprint("tasks", __name__)


@task_routes.route("")
@login_required
def get_all_tasks():
    """Gets all tasks"""
    try:
        # print("-=-=-=-==-=->", current_user.id)
        tasks = Task.query.filter_by(character_id=current_user.id).all()

        tasks_list = [task.to_dict() for task in tasks]

        # print("tasks_list --->", tasks_list)

        return tasks_list

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@task_routes.route("/new", methods=["POST"])
@login_required
def create_new_task():
    """Creates new task"""

    try:
        data = request.json

        due_date_str = data.get("due_date")
        due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

        new_task = Task(
            character_id=current_user.id,
            name=data.get("name"),
            category=data.get("category"),
            description=data.get("description"),
            due_date=due_date,
            priority=data.get("priority"),
            points=data.get("points"),
            completed=data.get("completed"),
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify(new_task.to_dict()), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@task_routes.route("/<int:task_id>")
@login_required
def get_task_details(task_id):
    """Get task details by task_id"""

    try:
        task = Task.query.filter_by(id=task_id).first()

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if current_user.id != task.character_id:
            return jsonify({"error": "User not authorized"}), 403

        return jsonify(task.to_dict())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@task_routes.route("/<int:task_id>/edit", methods=["PUT"])
@login_required
def edit_task(task_id):
    """Edit task details based on task_id"""

    try:
        task = Task.query.filter_by(id=task_id).first()

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if current_user.id != task.character_id:
            return jsonify({"error": "User not authorized"}), 403

        data = request.json

        due_date_str = data.get("due_date")
        due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

        task.character_id = current_user.id
        task.name = data.get("name")
        task.category = data.get("category")
        task.description = data.get("description")
        task.due_date = due_date
        task.priority = data.get("priority")
        task.points = data.get("points")
        task.completed = data.get("completed")

        db.session.commit()

        return jsonify(task.to_dict())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@task_routes.route("/<int:task_id>/delete", methods=["DELETE"])
@login_required
def delete_task(task_id):
    try:
        task = Task.query.get(task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        if task:
            if current_user.id != task.character_id:
                return jsonify({"error": "User not authorized"}), 403

        db.session.delete(task)
        db.session.commit()

        return task.to_dict()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

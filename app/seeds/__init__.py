from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tasks import seed_tasks, undo_tasks
from .pixel_art_models import seed_pixel_art_models, undo_pixel_art_models
from .characters import seed_characters, undo_characters
# from .leaderboards import (
#     seed_leaderboards,
#     undo_leaderboards,
# )  # Add import for leaderboard
from .quests import seed_quests, undo_quests  # Add import for quest
# from .quest_details import (
#     seed_quest_details,
#     undo_quest_details,
# )  # Add import for quest_details
from .stats import seed_stats, undo_stats

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        undo_users()
        undo_tasks()
        undo_pixel_art_models()
        undo_characters()
        # undo_leaderboards()  # Call the undo function for leaderboard
        undo_quests()  # Call the undo function for quest
        # undo_quest_details()  # Call the undo function for quest_details
        undo_stats()
    seed_users()
    seed_tasks()
    seed_pixel_art_models()
    seed_characters()
    # seed_leaderboards()  # Call the seed function for leaderboard
    seed_quests()  # Call the seed function for quest
    # seed_quest_details()  # Call the seed function for quest_details
    seed_stats()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pixel_art_models RESTART IDENTITY CASCADE;"
        )
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;"
        )
        # db.session.execute(
        #     f"TRUNCATE table {SCHEMA}.leaderboard RESTART IDENTITY CASCADE;"
        # )  # Add truncate for leaderboard
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.quests RESTART IDENTITY CASCADE;"
        )  # Add truncate for quests
        # db.session.execute(
        #     f"TRUNCATE table {SCHEMA}.quest_details RESTART IDENTITY CASCADE;"
        # )  # Add truncate for quest_details
        db.session.execute(f"TRUNCATE table {SCHEMA}.stats RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")
        db.session.execute("DELETE FROM pixel_art_models")
        db.session.execute("DELETE FROM characters")
        # db.session.execute("DELETE FROM leaderboard")  # Add delete for leaderboard
        db.session.execute("DELETE FROM quests")  # Add delete for quests
        # db.session.execute("DELETE FROM quest_details")  # Add delete for quest_details
        db.session.execute("DELETE FROM stats")
        db.session.execute("DELETE FROM users")

    db.session.commit()

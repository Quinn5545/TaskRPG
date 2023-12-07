from app.models import db, User, environment, SCHEMA, Quest
from sqlalchemy.sql import text


def seed_quests():
    # demo_quest = Quest(
    #     character_id=1,
    #     name="demo_quest",
    #     description="demo_quest 1",
    #     reward=3,
    #     completed=False,
    # )
    # marnie_quest = Quest(
    #     character_id=2,
    #     name="demo_quest",
    #     description="demo_quest 2",
    #     reward=3,
    #     completed=False,
    # )
    # bobbie_quest = Quest(
    #     character_id=3,
    #     name="demo_quest",
    #     description="demo_quest 3",
    #     reward=3,
    #     completed=False,
    # )

    # db.session.add_all([demo_quest, marnie_quest, bobbie_quest])
    db.session.add_all()
    db.session.commit()


# Undo the seed operation
def undo_quests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM quests"))

    db.session.commit()

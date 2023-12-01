from app.models import db, User, environment, SCHEMA, Stat
from sqlalchemy.sql import text


def seed_stats():
    demo_stats = Stat(character_id=1, completed_tasks=2, completed_quests=1)
    marnie_stats = Stat(character_id=2, completed_tasks=3, completed_quests=2)
    bobbie_stats = Stat(character_id=3, completed_tasks=4, completed_quests=3)

    db.session.add_all([demo_stats, marnie_stats, bobbie_stats])
    db.session.commit()


# Undo the seed operation
def undo_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stats"))

    db.session.commit()

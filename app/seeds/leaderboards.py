from app.models import db, User, environment, SCHEMA, Leaderboard
from sqlalchemy.sql import text


def seed_leaderboards():
    demo = Leaderboard(character_id=1, high_score=5)
    marnie = Leaderboard(character_id=2, high_score=6)
    bobbie = Leaderboard(character_id=3, high_score=8)

    db.session.add_all([demo, marnie, bobbie])
    db.session.commit()


# Undo the seed operation
def undo_leaderboards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.leaderboards RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM leaderboards"))

    db.session.commit()

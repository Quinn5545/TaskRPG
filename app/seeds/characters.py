from app.models import db, Character, PixelArtModel, SCHEMA, environment
from sqlalchemy.sql import text


def seed_characters():
    demo = Character(
        creator_id=1,
        model_id=1,
        name="Demo",
        xp=0,
        level=1,
    )
    marnie = Character(creator_id=2, model_id=2, name="Marnie", xp=0, level=1)
    bobbie = Character(creator_id=3, model_id=3, name="Bobbie", xp=0, level=1)

    db.session.add_all([demo, marnie, bobbie])
    db.session.commit()


# Undo the seed operation
def undo_characters():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM characters"))
    db.session.commit()

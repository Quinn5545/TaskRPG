from app.models import db, Character, PixelArtModel


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
    db.session.execute("DELETE FROM characters")
    db.session.commit()

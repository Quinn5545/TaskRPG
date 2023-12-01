from app.models import db, Character, PixelArtModel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pixel_art_models():
    model1 = PixelArtModel(
        name="Model 1",
        image_url="https://www.megavoxels.com/wp-content/uploads/2023/07/Pixel-Art-Dog-6-1.jpeg",
    )
    model2 = PixelArtModel(
        name="Model 2",
        image_url="https://p7.hiclipart.com/preview/361/41/234/cat-pixel-art-pusheen-cat-thumbnail.jpg",
    )
    model3 = PixelArtModel(
        name="Model 3",
        image_url="https://img.freepik.com/premium-vector/vector-flat-design-pixel-art-capybara-animal-character_972090-10.jpg?w=2000",
    )

    db.session.add_all([model1, model2, model3])
    db.session.commit()


def undo_pixel_art_models():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE TABLE {SCHEMA}.pixel_art_models RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM pixel_art_models"))

    db.session.commit()

from app.models import db, Character, PixelArtModel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pixel_art_models():
    model1 = PixelArtModel(
        name="Model 1",
        image_url="https://cdnb.artstation.com/p/assets/images/images/047/232/071/large/isabel-loo-f1d4a030-38a0-40ca-b570-77a46426665c.jpg?1647090410",
    )
    model2 = PixelArtModel(
        name="Model 2",
        image_url="https://cdnb.artstation.com/p/assets/images/images/047/232/065/large/isabel-loo-895bcb5a-a9c1-414f-8bd9-593ebad3be51.jpg?1647090401",
    )
    model3 = PixelArtModel(
        name="Model 3",
        image_url="https://img.freepik.com/premium-vector/vector-flat-design-pixel-art-capybara-animal-character_972090-10.jpg?w=2000",
    )
    model4 = PixelArtModel(
        name="Model 4",
        image_url="https://cdna.artstation.com/p/assets/images/images/047/232/074/large/isabel-loo-5e998d99-1259-4abe-9681-f1bb4fd6a2db.jpg?1647090413",
    )
    model5 = PixelArtModel(
        name="Model 5",
        image_url="https://cdna.artstation.com/p/assets/images/images/047/232/076/large/isabel-loo-c208cae8-d6ef-45fa-842d-0c8ea3f09ee7.jpg?1647090415",
    )
    model6 = PixelArtModel(
        name="Model 6",
        image_url="https://www.shutterstock.com/shutterstock/photos/1367180762/display_1500/stock-vector-pig-pixel-art-1367180762.jpg",
    )
    model7 = PixelArtModel(
        name="Model 7",
        image_url="https://cdna.artstation.com/p/assets/images/images/047/232/066/large/isabel-loo-48e9eecc-81df-4025-b7c6-02e9f6edd10b.jpg?1647090405",
    )
    model8 = PixelArtModel(
        name="Model 8",
        image_url="https://cdnb.artstation.com/p/assets/images/images/047/232/069/large/isabel-loo-8e03585e-9d89-4772-9f47-d42dd7b7c401.jpg?1647090407",
    )

    db.session.add_all([model1, model2, model3, model4, model5, model6, model7, model8])
    db.session.commit()


def undo_pixel_art_models():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE TABLE {SCHEMA}.pixel_art_models RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM pixel_art_models"))

    db.session.commit()

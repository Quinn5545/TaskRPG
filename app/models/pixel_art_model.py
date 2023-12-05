from .db import db, environment, SCHEMA, add_prefix_for_prod


class PixelArtModel(db.Model):
    __tablename__ = "pixel_art_models"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)

    # relationship
    characters = db.relationship("Character", backref="pixel_art_model")

    def to_dict(self):
        return {"id": self.id, "name": self.name, "image_url": self.image_url}

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Character(db.Model):
    __tablename__ = "characters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    model_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("pixel_art_models.id")),
        nullable=False,
    )

    name = db.Column(db.String(50), nullable=False)
    xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)

    # relationships
    # leaderboard = db.relationship("Leaderboard", backref="character")
    pixel_art_model = db.relationship("PixelArtModel", back_populates="characters")
    task = db.relationship(
        "Task", back_populates="character", cascade="all, delete-orphan"
    )
    stat = db.relationship(
        "Stat", back_populates="character", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "creator_id": self.creator_id,
            "model_id": self.model_id,
            "name": self.name,
            "xp": self.xp,
            "level": self.level,
        }

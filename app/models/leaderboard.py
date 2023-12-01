from .db import db, environment, SCHEMA, add_prefix_for_prod


class Leaderboard(db.Model):
    __tablename__ = "leaderboards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    high_score = db.Column(db.Integer)

    # relationships

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "high_score": self.high_score,
        }

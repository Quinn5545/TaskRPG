from .db import db, environment, SCHEMA, add_prefix_for_prod


class Quest(db.Model):
    __tablename__ = "quests"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    name = db.Column(db.String(50))
    description = db.Column(db.String(100))
    reward = db.Column(db.Integer)
    completed = db.Column(db.Boolean, default=False)

    # relationships
    # quest_detail = db.relationship(
    #     "Quest_Detail", back_populates="quest", cascade="all, delete"
    # )

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "name": self.name,
            "description": self.description,
            "reward": self.reward,
            "completed": self.completed,
        }

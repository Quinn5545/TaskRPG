from .db import db, environment, SCHEMA, add_prefix_for_prod


class Stat(db.Model):
    __tablename__ = "stats"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    completed_tasks = db.Column(db.Integer)
    completed_quests = db.Column(db.Integer)

    # relationships
    character = db.relationship("Character", back_populates="stat")

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "completed_tasks": self.completed_tasks,
            "completed_quests": self.completed_quests,
        }

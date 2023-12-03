from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False
    )
    quest_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("quests.id")), nullable=True
    )
    name = db.Column(db.String(50))
    category = db.Column(db.String(50))
    description = db.Column(db.String(100))
    due_date = db.Column(db.Date)
    priority = db.Column(db.Integer)
    points = db.Column(db.Integer)
    completed = db.Column(db.Boolean, default=False)

    # relationships
    quest = db.relationship("Quest", backref="task")

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "quest_id": self.quest_id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "due_date": str(self.due_date),
            "priority": self.priority,
            "points": self.points,
            "completed": self.completed,
        }

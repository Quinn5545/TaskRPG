# from .db import db, environment, SCHEMA, add_prefix_for_prod


# class Quest_Detail(db.Model):
#     __tablename__ = "quest_details"

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     quest_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("quests.id")), nullable=False
#     )
#     task_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")), nullable=False
#     )

#     # relationships
#     quest = db.relationship("Quest", back_populates="quest_detail")

#     def to_dict(self):
#         return {"id": self.id, "quest_id": self.quest_id, "task_id": self.task_id}

# from app.models import db, User, environment, SCHEMA, Quest_Detail
# from sqlalchemy.sql import text


# def seed_quest_details():
#     demo_quest = Quest_Detail(quest_id=1, task_id=1)
#     marnie_quest = Quest_Detail(quest_id=2, task_id=2)
#     bobbie_quest = Quest_Detail(quest_id=3, task_id=3)

#     db.session.add_all([demo_quest, marnie_quest, bobbie_quest])
#     db.session.commit()


# # Undo the seed operation
# def undo_quest_details():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.quest_details RESTART IDENTITY CASCADE;"
#         )
#     else:
#         db.session.execute(text("DELETE FROM quest_details"))

#     db.session.commit()

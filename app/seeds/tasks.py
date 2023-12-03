from app.models import db, User, environment, SCHEMA, Task
from sqlalchemy.sql import text
from datetime import datetime


def seed_tasks():
    demo_task = Task(
        character_id=1,
        quest_id=1,
        name="Demo Task 1",
        category="fitness",
        description="This is the first demo task.",
        due_date=datetime.strptime("2023-12-31", "%Y-%m-%d").date(),
        priority=1,
        points=3,
        completed=False,
    )
    marnie_task = Task(
        character_id=2,
        # quest_id=2,
        name="Demo Task 2",
        category="chores",
        description="This is the second demo task.",
        due_date=datetime.strptime("2023-12-31", "%Y-%m-%d").date(),
        priority=2,
        points=3,
        completed=False,
    )
    bobbie_task = Task(
        character_id=3,
        # quest_id=3,
        name="Demo Task 3",
        category="work",
        description="This is the third demo task.",
        due_date=datetime.strptime("2023-12-31", "%Y-%m-%d").date(),
        priority=3,
        points=3,
        completed=False,
    )
    db.session.add_all([demo_task, marnie_task, bobbie_task])
    db.session.commit()


# Undo the seed operation
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()

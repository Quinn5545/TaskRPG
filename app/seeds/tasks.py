from app.models import db, User, environment, SCHEMA, Task
from sqlalchemy.sql import text
from datetime import datetime


def seed_tasks():
    demo_task = Task(
        character_id=1,
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
        name="Demo Task 3",
        category="work",
        description="This is the third demo task.",
        due_date=datetime.strptime("2023-12-31", "%Y-%m-%d").date(),
        priority=3,
        points=3,
        completed=False,
    )
    demo_task2 = Task(
        character_id=1,
        name="Demo Task 1 test",
        category="fitness",
        description="This is the first 1 demo task.",
        due_date=datetime.strptime("2023-12-19", "%Y-%m-%d").date(),
        priority=1,
        points=3,
        completed=False,
    )
    marnie_task2 = Task(
        character_id=1,
        name="Demo Task 2 test",
        category="chores",
        description="This is the second 1 demo task.",
        due_date=datetime.strptime("2023-12-16", "%Y-%m-%d").date(),
        priority=2,
        points=3,
        completed=False,
    )
    bobbie_task2 = Task(
        character_id=1,
        name="Demo Task 3 test",
        category="work",
        description="This is the third 1 demo task.",
        due_date=datetime.strptime("2023-12-12", "%Y-%m-%d").date(),
        priority=3,
        points=3,
        completed=False,
    )
    christmas = Task(
        character_id=1,
        name="Christmas",
        category="holiday",
        description="This is CHRISTMAS.",
        due_date=datetime.strptime("2023-12-25", "%Y-%m-%d").date(),
        priority=3,
        points=3,
        completed=False,
    )
    db.session.add_all(
        [
            demo_task,
            marnie_task,
            bobbie_task,
            demo_task2,
            marnie_task2,
            bobbie_task2,
            christmas,
        ]
    )
    db.session.commit()


# Undo the seed operation
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()

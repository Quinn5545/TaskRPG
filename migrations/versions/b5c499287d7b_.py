"""empty message

Revision ID: b5c499287d7b
Revises:
Create Date: 2023-12-01 15:34:45.442903

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "b5c499287d7b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "pixel_art_models",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=40), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("username"),
    )
    op.create_table(
        "characters",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("creator_id", sa.Integer(), nullable=False),
        sa.Column("model_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("xp", sa.Integer(), nullable=True),
        sa.Column("level", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["creator_id"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["model_id"],
            ["pixel_art_models.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # op.create_table('quests',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('character_id', sa.Integer(), nullable=False),
    # sa.Column('name', sa.String(length=50), nullable=True),
    # sa.Column('description', sa.String(length=100), nullable=True),
    # sa.Column('reward', sa.Integer(), nullable=True),
    # sa.Column('completed', sa.Boolean(), nullable=True),
    # sa.ForeignKeyConstraint(['character_id'], ['characters.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    op.create_table(
        "stats",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("character_id", sa.Integer(), nullable=False),
        sa.Column("completed_tasks", sa.Integer(), nullable=True),
        sa.Column("completed_quests", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["character_id"],
            ["characters.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "tasks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("character_id", sa.Integer(), nullable=True),
        sa.Column("quest_id", sa.Integer(), nullable=True),
        sa.Column("name", sa.String(length=50), nullable=True),
        sa.Column("category", sa.String(length=50), nullable=True),
        sa.Column("description", sa.String(length=100), nullable=True),
        sa.Column("due_date", sa.Date(), nullable=True),
        sa.Column("priority", sa.Integer(), nullable=True),
        sa.Column("points", sa.Integer(), nullable=True),
        sa.Column("completed", sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(
            ["character_id"],
            ["characters.id"],
        ),
        sa.ForeignKeyConstraint(
            ["quest_id"],
            ["quests.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("tasks")
    op.drop_table("stats")
    # op.drop_table("quests")
    op.drop_table("characters")
    op.drop_table("users")
    op.drop_table("pixel_art_models")
    # ### end Alembic commands ###
# TaskRPG
TaskRPG, game-ify your tasks!

## Database Schema Design

<!--!!START SILENT -->

![TaskRPG-database-schema]

[TaskRPG-database-schema]: https://github.com/Quinn5545/TaskRPG/assets/76134978/20a554bc-e171-41fe-a623-d6772a8f597b


<!--!!END -->
<!--!!ADD -->
<!-- `<insert database schema design here>` -->
<!--!!END_ADD -->

## API Documentation

# Users
## Sign Up
As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.

### When I'm on the /signup page:

I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
I would like the website to log me in upon successful completion of the sign-up form.
So that I can seamlessly access the site's functionality.
When I enter invalid data on the sign-up form:

I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
So that I can try again without needing to refill forms I entered valid data into.
# Log In
As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.

### When I'm on the /login page:

I would like to be able to enter my email and password on a clearly laid out form.
I would like the website to log me in upon successful completion of the log-in form.
So that I can seamlessly access the site's functionality.

### When I enter invalid data on the log-in form:

I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
So that I can try again without needing to refill forms I entered valid data into.
# Demo User
As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.

### When I'm on either the /signup or /login pages:

I can click on a Demo User button to log me in and allow me access as a normal user.
So that I can test the site's features and functionality without needing to stop and enter credentials.
# Log Out
As a logged in user, I want to log out via an easy to find log out button on the navigation bar.

### While on any page of the site:

I can log out of my account and be redirected to a page displaying recent FauxTweets.
So that I can easily log out to keep my information secure.

# Character
## Create Character
As a logged in user, I want to create a new character.

### When I'm on the /create-character page:

I would like to fill out a form with character details, such as name and appearance.
I would like the website to create a new character upon form submission.
So that I can personalize my gaming experience.

## Read Character
As a logged in user, I want to view information about my character.

### When I'm on the /character page:

I would like to see details about my character, such as name, appearance, experience points, and level.
So that I can track my character's progress.
## Update Character
As a logged in user, I want to update information about my character.

### When I'm on the /edit-character page:

I would like to edit my character's details, such as appearance and skills.
I would like the website to update my character's information upon form submission.
So that I can adapt my character as I progress in the game.
## Delete Character
As a logged in user, I want to delete my character.

### When I'm on the /delete-character page:

I would like to confirm the deletion of my character.
I would like the website to permanently delete my character upon confirmation.
So that I can start fresh or make significant changes to my character.

# Tasks
## Create Task
As a logged in user, I want to create a new task.

### When I'm on the /create-task page:

I would like to fill out a form with task details, such as name and priority.
I would like the website to create a new task upon form submission.
So that I can organize and track my tasks in the game.
## Read Task
As a logged in user, I want to view information about my tasks.

### When I'm on the /tasks page:

I would like to see details about my tasks, such as name, description, due date, and priority.
So that I can manage and prioritize my tasks.

## Update Task
As a logged in user, I want to update information about my tasks.

### When I'm on the /edit-task page:

I would like to edit my task details, such as description and priority.
I would like the website to update my task information upon form submission.
So that I can adapt my tasks as needed.

## Delete Task
As a logged in user, I want to delete my tasks.

### When I'm on the /delete-task page:

I would like to confirm the deletion of my task.
I would like the website to permanently delete my task upon confirmation.
So that I can remove completed or unnecessary tasks from my list.

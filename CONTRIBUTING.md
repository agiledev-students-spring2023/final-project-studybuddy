# Guide to Contributing
This is guide for contributors of StudyBuddy project.

# Team norms

## Team values

* Our team is going to communicate using discord private channel. 
* If anyone goes through certain issues, other team members will always try best to resolve the problem. 
* When there exists disagreements, we will arrange an addition meeting other than our daily scrum. 
* When a team members keeps failing to deliver on their obligations, the other memebrs will discuss how to deal with the task and make sure we do not miss that part of our project. 
* Team members will respond to messages in 5 hours during the activity time (9am-9pm). 

## Sprint cadence
* Each sprint will take 10-14 days. 


## Daily standups
* Daily standups will take place on Mondays, Wednesdays, Fridays , preferably after everyone finishes with their classes.
* Members are expected to be present synchronously and each member will not cover for other members who do not participate.
* A member who makes no progress on a task for two standups or more in a row will be reported to management.


## Coding standards
* Designate a code editor and code linter all team members will use to standardize code formatting.
* Write minimum code to get things working end to end, only then iterate to improve.
* Always push working code, if you break the pipeline/build then fix it.
* Make granular and small commits, per feature or per bug fix.
* Provide descriptive commit messages.
* Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
* Don't leave dead/commented out code behind. If you see such code, delete it.
* Write automated tests to cover critical integration points and functionality (once you learn how to do that).


# Git Workflow
* The StudyBuddy team follows a feature branch version control workflow.
* Each team member will develop features of StudyBuddy app, and send a Pull Request, and if all team members agree, we will merge it into the `main` branch. 

# How to contribute
* Contribute based on Github Issues
* Choose what to contribute at daily standup meeting
* Create a branch of the corresponding feature
* After developing own feature, test the code and make sure there is no errors (e.g., run `npm start`)
* Commit changes on remote feature branch, and send Pull Request
* Inform the team members of the Pull Request and discuss it
* If every team members agree with it, merge the changes to `main` branch

# Development Instructions
## How to set up the development environment
1. Clone this repository to your local machine
~~~
git clone https://github.com/agiledev-students-spring-2023/final-project-studybuddy.git
~~~
2. Change the working directory to front-end and run `npm install`. Do the same for back-end.
3. Run the local dev environment using `npm start` for both front-end and back-end.


## How to build and test the project
This information will be added as we make some progress on the development.

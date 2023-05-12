# Project Moesland

Version 0.2.0

Merge order 

1. task > user story
2. user story > develop
3. (end sprint)
4. develop > main

## Branch naming Convention

To keep our repository organized and consistent, we require that all branch names in this repository use kebab-case and that all user 
stories with task should be separated with a forward slash ("/"). For Example `user-story-name/task-name`
Using a consistent naming convention for folders makes it easier for team members to find and understand the purpose of each folder. 
It also helps to avoid naming conflicts and ensures that all folders are named in a consistent and readable way.

Please use the user story/task name from Jira, for example: ml-61/ml-67

## Folder and file name convention

It is recommend to follow the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#file-name) 
for file and folder naming conventions in JavaScript and React projects. The guide recommends using kebab-case for folder names and 
provides guidelines for other conventions.

## Docker
To start the project, navigate to the project directory in your terminal and run the following command: `docker-compose up --force-recreate --build -d`
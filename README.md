## Clone this project to your computer (After installing git)

    git clone https://github.cs.adelaide.edu.au/MCI-Projects-2021/Team-024.git

## Push to github

1.  Commit the current work

    git add .
    git commit -m “(message)”

2.  Push to github

    git push

P.S. It is always good to first run "git pull" first before working on your changes and pushing that into github

## Start and run the backend server

1.  With docker installed and update, navigate to the folder /MindSpaceApi and run:

    docker-compose build
    docker-compose up

2.  After that, you can go to http://127.0.0.1/admin to access the admin page of the Django server

## Access the database with Django admin page

    You can access the server with the following admin account with the database pushed into the current github project:

    Uid: a1
    Password: 123456

    If you want to start the Django server with an empty database, after the backend server is running, you can run the following command to create a new superadmin user:

    docker-compose run --rm app sh -c "python manage.py createsuperuser"

## Troubleshooting for running the backend server

1.  Problem: "app" service starts to initiate before "db" service completes its initialization, which causing the "app" service fails to connect to the database

    Solution: Open a new command window and run "docker-compose up" again to let the "app" service to attempt the database connection again

2.  Problem: "app" service fails to connect to the database because of incompatiable innoDB version number (Or any other problems related to the existing database)

    Solution: Delete all the images and building cache of Docker in your local machine with the following command.

    docker image prune -a
    docker builder prune -a

    After that, try to build and run the docker container with "docker-compose build" and "docker-compose up" again

## How to run the ionic project

    Navigate to the folder /MindSpace, run:

    ionic serve

## Project Aims

MindSpace is a cross-platform app that harnesses the power of NLP to analyze social media and keyboard data to display user emotions and intensity in interactive graphs and diagrams to help users identify their current emotions. The purpose of this application is to help users increase their emotional awareness and provide them with the resources to manage their emotional issues, solve the current problems of mental health in society by taking advantage of technological advances in the current era. 

Our team is responsible for the design and development of the mobile app using the sample data provided by our clients Dr. Thushari Atapattu and Menasha Thilakaratne. We developed functions for users to track emotional data on a weekly and monthly basis, make reflections for specific emotions, and seek strategies to handle emotional problems.

While our client, the lab of Language Technology for Social Good (LT4SG) is responsible for emotional data processing, natural language processing, and artificial intelligence. The NLP algorithm developed by LT4SG identifies the triggers of users "emotions, which allows the app to present the triggered emotions to users to gain a better understanding of the main causes of their emotions.
![project preview v2](https://user-images.githubusercontent.com/62090279/141150560-49f3dc49-cecf-456c-a448-bd74b3c1b32a.png)


## Start and run the backend server

1.  With docker installed and update, navigate to the folder /MindSpaceApi and run:

    docker-compose build\
    docker-compose up

2.  After that, you can go to http://127.0.0.1/admin to access the admin page of the Django server

## Access the database with Django admin page

1.  You can access the server with the following admin account with the database pushed into the current github project:

    Uid: a1\
    Password: 123456

2.  If you want to start the Django server with an empty database, after the backend server is built and running, you can run the following command to create a new superadmin user:

    docker-compose run --rm app sh -c "python manage.py createsuperuser"

## Import sample data

1.  Data of emotion records has to be saved as mindspace_dataset.csv in the directory /MindSpaceApi/app/. Each row of the csv file is in the format of[UserName, Emotion, PostedDate, Post]. Note that the UserName field has to be either "U1" or "U2" in the current demo. This will allow mapping each entry to the user with "U1_UID" or "U2_UID" specified as environment variables in the file /MindSpaceApi/docker-compose.yml. Also, the PostedDate field has to be in the format of "YYYY-MM-DD" for the following import_data command to work.

2.  Definition of trigger keywords has to be saved as trigger_keywords.csv in the directory /MindSpaceApi/app/. Each row of the csv file is in the format of [Emotion, Trigger keywords]. Trigger keywords field has to be a comma separated list of trigger keywords that maps to the corresponding emotion.

3.  With the data of emotion records and trigger keywords on place. The processed data can be saved into database using the following command after the backend server is built and running:

    docker-compose run --rm app sh -c "python manage.py import_data"

## Troubleshooting for running the backend server

1.  Problem: "app" service starts to initiate before "db" service completes its initialization, which causing the "app" service fails to connect to the database

    Solution: Open a new command window and run "docker-compose up" again to let the "app" service to attempt the database connection again

2.  Problem: "app" service fails to connect to the database because of incompatiable innoDB version number (Or any other problems related to the existing database)

    Solution: Delete all the images and building cache of Docker in your local machine with the following command.

    docker image prune -a\
    docker builder prune -a

    After that, try to build and run the docker container with "docker-compose build" and "docker-compose up" again

## How to run the ionic project

1.  Navigate to the folder /MindSpace, run:

    ionic serve

## Testing user accounts

1.  In the current demo, the email and password of the two testing accounts (U1 and U2) are:

    Email: test@test.com, Password: 123456\
    Email: test2@test.com, Password: 123456

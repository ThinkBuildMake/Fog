# Backend
Fog uses a Python Flask backend to build a web application backend

## Setup 
1. Make sure that you have [Python 3.6.* or higher](https://www.python.org/downloads/) and pip installed on your machine. 
2. (Optional) Create a virtual environment
3. Install all necessary python packages with 
    > pip install -r requirements.txt
    >
4. Fog uses environmental variables to store important app-specific information so navigate the 
    > ./app 
    >
    directory and create an .env file

## How to Run
1. Navigate into the 
    > ./app 
    >
    directory and run 
    ```
    python __init__.py
    ```
2. The Flask App should be running in the environment

## Features in Development 
- Implementing OAuth into the project 
- Ability to create local MongoDB instances
- Containerization of MongoDB and Server Instances

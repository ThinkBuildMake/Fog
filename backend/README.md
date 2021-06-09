# Backend
Fog uses a Python Flask backend to build a web application API and database interface

## Backend Development Setup 
1. Make sure that you have [Python 3.6.* or higher](https://www.python.org/downloads/) and pip installed on your machine.
2. Install the **professional** edition of [Pycharm](https://www.jetbrains.com/pycharm/download/). 
   The professional edition is needed for the project and requires the [student license](https://www.jetbrains.com/community/education/#students).   
3. Git clone the entire repository to your local machine
4. Open the folder 
   >Fog/backend 
   > 
   in Jetbrain's Pycharm IDE as an existing project. Pycharm will do some initial setup, let it do its thing. If you get a popup from Pycharm which asks to install the venv and requirements.txt dependencies, say YES and install it.
5. Verify that the virtual environment was installed correctly. The virtual environment (VENV) is normally installed automatically by Pycharms in the previous step. 
   Go to File > Settings > Project:backend > Project Interpreter. 
   If it is installed, select the env Python interpreter in the 
   >Fog/venv/
   > 
   directory from this menu and you should be good! All the package installations should be shown below the interpreter.
   If it is not installed, select "No Interpreter" as the project interpreter and apply changes. 
   If you get an option to add a new interpreter & venv, click this and create a new venv using the python interpreter you previously installed on your machine. 
   If the popup never shows up then click the gear icon on the top right corner of the menu and click add interpreter.  You should be able to create a new venv.
6. If you have installed the venv but still need to install the packages, you should get a popup to install the dependencies in requirements.txt. 
   Say yes to this, and it should take care of all of your pip installations. Easy! Else, install the dependencies according to the requirements.txt as defined under "Installing New Dependencies" below (no need to pip freeze)
7. To setup your run configuration, add a new run configuration at the top right of your IDE and select "Flask Server".
   First, set Target type: script, and set Target to:
   >Fog\backend\app
   > 
   Additionally, set FLASK_ENV=development and FLASK_DEBUG=TRUE. 
   Lastly, verify that your Python Interpreter points to the one in your venv, and make sure your working directory is empty with no path (defaults to base directory). 
   Then Apply and OK.
   You can run from now on from the top right with the green error. The actual run should fail and raise a KeyError. 
   This is because we still need to configure the environment variables in the next step.
8. Fog uses environment variables to store important app-specific information. Ask for the .env file from Eralp or other team members and navigate to the
    > Fog/backend/app 
    >
    directory and drop the .env file here.
9. The Last requirement is to connect successfully to the MongoDB database. Ask team members for group account and how to connect.

## Installing New Dependencies
1. Go to File > Settings > Project:backend > Project Interpreter and click the plus icon and search for what you want to install. Click Install.
2. After this, it is very important that you add this project to the requirements file so that the team knows there is a new required dependency in the project. 
   Open the terminal at the project directory, and activate the venv. Then type:
   > pip -m freeze > requirements.txt
   >

## How to Run
1. Select the run configuration in the top right menu and click the green arrow.
2. The Flask App should be running in the environment. Click the Red Stop button to stop Flask.

## Environment Variables
Consult the team for information regarding the environment variables (the .env file) used in development.

## Features in Development 
- Implementing OAuth into the project 
- Ability to create local MongoDB instances
- Containerization of MongoDB and Server Instances
- Safer method of managing secrets for production

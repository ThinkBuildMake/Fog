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
   in Jetbrain's Pycharm IDE as an existing project. Pycharm will do some initial setup, let it do its thing.
5. Check to see if the virtual environment is installed. The virtual environment (VENV) is normally installed automatically by Pycharms in the previous step. 
   Go to File > Settings > Project:backend > Project Interpreter. 
   If it is installed, select the env Python interpreter in the 
   >`Fog/venv/` 
   > 
   directory from this menu and you should be good! 
   If it is not installed, select "No Interpreter" as the project interpreter and apply changes. 
   If you get an option to add a new interpreter & venv, click this and create a new venv using the python interpreter you previously installed on your machine
   (you may have to do some tinkering in the menu for this option to show up. If you still have problems contact Eralp).
6. Once you have your venv setup, you should get a popup to install the dependencies in requirements.txt. 
   Say yes to this, and it should take care of all of your pip installations. Easy!
7. To setup your run configuration, right click `__init__.py` under 
   >`Fog\backend\app` 
   > 
   and click run. 
   This should generate a run configuration for you, which you can run from now on from the top right. The actual run should fail and raise a KeyError. 
   This is because we still need to configure the environment variables in the next step.
8. Fog uses environment variables to store important app-specific information. Ask for the .env file from Eralp or other team members and navigate to the
    > Fog/backend/app 
    >
    directory and drop the .env file here. You should now be good. Contact Eralp if you need any help.

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

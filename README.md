# Project
The project is divided into a React Frontend and a Flask Backend. We are using NextJS for ease of deployment via Vercel.

## How to use
```
git clone <Name of Directory>
```
## Frontend
Install Node Version Manager (nvm), cd into the directory and type 
```
nvm use
```
Inside the frontend directory, type
```
npm install 
```
to install the dependencies and 
```
npm run dev
```
 to run the project

## Backend
Easily install all dependencies by typing 
```
pip install -r requirements.txt
```
As we are using python as a backend, we will be using a virtual environment to handle dependencies. To enable the virtual environment, cd into the backend directory and type 

```
source ./venv/bin/activate
```

In order to export installed dependencies to the requirements.txt file, type
```
pip -m freeze >> requirements.txt
```
# GameOfLife

![Alt text](/game of life.png?raw=true

#Technology Stack

Backbone, Typescript, Entityframework, Asp.Net MVC, Asp.Net Web API, Grunt, bootstrap and SQl Server

# Settin up environment

Database

1. Connection string - change the connection string according to your local database in project GameOfLifeApi web.config file
    <add key="ConnectionString" value="Data Source=DELL\SQLEXPRESS;Initial Catalog=gameoflife;Integrated Security=False;Persist Security Info=False;User ID=sa;Password=Anil@123" />
2. This is a code first approch, but still you can just run the scripts provided in scripts folder, that will create the tables and initial data for you.

Typescript Project

I have seperated the client side code to a seperate project called GameOfLifeJS

The client side scripting is done with backbone, jquery and underscore with typescript. 

To set up the dev environment for GameOfLifeJS, you need to install 

1. Typescript 1.7  or above, 
2. Install Grunt globally as I am using grunt for cpying and uglifying tasks.
3. Task Runner Explorer to run the grunt task.

Once above prerequisites are ready, build the project and run the grunt task using task runner explorer, this will uglify and copy the required files from GameOfLifeJS project build folder to GameOfLifeWeb Script folder.

Setup Rest API

1. Complete database setup mentioned above
2. In iis create a application called http://localhost/GameOfLifeService, you can do the same thing from VS2013, project properties
    1. Righ click GameOfLifeApi project and select properties
    2. Go to web tab and in server section select Local IIS
    3. Change Project URL to http://localhost/GameOfLifeService and click on create virtual directory button to create tye application in iis

Setup Web Application

1. In iis create a application called http://localhost/GameOfLife
2. Correct api url in web.config file is any change in rest api url (<add key="apiurl" value="http://localhost/GameOfLifeService/api/"/>)

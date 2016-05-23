# GameOfLife
Game of life application

#Technology Stack

Backbone, Typescript, Entityframework, Asp.Net MVC, Asp.Net Web API, Grunt, bootstrap and SQl Server

# Settin up environment

Database
1. Connection string, change the connection string according to your local database
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


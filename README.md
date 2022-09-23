# mpa-wine
Express.js multi page application using Handlebars for server-side rendering and MongoDB for data base
## :speech_balloon: Concept
An application with a main functionality to add, edit and delete products as well as an option to add accessories and attach them to products. User’s authentication provides possibility to add wines and accessories as well as edit and delete items. These functionalities are secured with middlewares and guards. 
Products can be searched by name and rating.
## :hammer_and_pick: Technologies used 
* Main - JavaScript, CSS, HTML, Node.js
* Framework - Express.js
* Server-side rendering - Handlebars
* ODM library for MongoDB - Mongoose
## :information_source: Structure
The application has the following parts:
### Home page / BROWSE
* All products can be seen with an option to search by name and define a range of market rating. 
* Product details can be loaded with information of the already attached accessories to the chosen wines.
### REGISTER
In order to use the full functionality, users must register and login.
Registration process is validated and sanitized by express-validator library with the following requirements:
* Email must be at least 4 characters long
* Password must be at least 4 characters long and should contain only letters and numbers
* Password must match the repeat password
* Validator is ensuring that the username input be a valid email
* Client receives the relevant error message to take relevant actions
### LOGIN
* Login process is ensured by JSON Web Token and technically implemented with the BCRYPT library 
* Client receives the relevant error message in case of invalid input
### ADD WINE
* Only logged in users have access of all functionalities of the application – add, delete, edit wines and accessories as well as attach accessories  to wines.
* The app can be tested with a preliminary created user:
    * Username - peter@abv.bg
    * Password - 1 (… just to be easy)
### ADD ACCESSORY
* Relation Wine - Accessory / Accessory - Wine has been made
### DETAILS PAGE
* Logged in users and publication owners can:
    * Edit wine
    * Delete wine
    * Attach accessory
### ABOUT
* Some more information about the site
## :paperclips: Project link on Internet
Now available at (after being patient enough to wait for the service restart – between 15 and 30 seconds): 
* on Heroku :point_right: https://mpa-wine.herokuapp.com/
* on Render :point_right: https://mpa-wine.onrender.com/
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
![home](https://user-images.githubusercontent.com/102145445/206909873-5655eea1-b290-43d3-96b8-5d78d831dab1.jpg)
* All products can be seen with an option to search by name and define a range of market rating. 
* Product details can be loaded with information of the already attached accessories to the chosen wines.
### REGISTER
![register](https://user-images.githubusercontent.com/102145445/206910073-9b269b07-135e-47c2-9a87-448a39ad183d.jpg)
In order to use the full functionality, users must register and login.
Registration process is validated and sanitized by express-validator library with the following requirements:
* Email must be at least 4 characters long
* Password must be at least 4 characters long and should contain only letters and numbers
* Password must match the repeat password
* Validator is ensuring that the username input be a valid email
* Client receives the relevant error message to take relevant actions
### LOGIN
![login](https://user-images.githubusercontent.com/102145445/206910230-d9d48946-69b4-44dd-b15f-631ec0d8296c.jpg)
* Login process is ensured by JSON Web Token and technically implemented with the BCRYPT library 
* Client receives the relevant error message in case of invalid input
* The app can be tested with a preliminary created user:
    * Username - peter@abv.bg
    * Password - 1 (… just to be easy)
### ADD WINE
![create](https://user-images.githubusercontent.com/102145445/206910417-944bca66-4a79-4c4c-9fd3-356461c375e0.jpg)
* Only logged in users have access of all functionalities of the application – add, delete, edit wines and accessories as well as attach accessories  to wines
### ADD ACCESSORY
* Relation Wine - Accessory / Accessory - Wine has been made
### DETAILS PAGE
![edit](https://user-images.githubusercontent.com/102145445/206910768-629ce4d6-f61f-459c-8f9a-15223f0694c8.jpg)
* Logged in users and publication owners can:
    * Edit wine
    * Delete wine
    * Attach accessory
### ABOUT
* Some more information about the site
## :paperclips: Project link on Internet
Now available at (after being patient enough to wait for the service restart – approx 30 seconds): 
* on Render :point_right: https://mpa-wine.onrender.com/
* on Azure :point_right: https://mpa-wine.azurewebsites.net/

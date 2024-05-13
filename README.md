# Weaver
Welcome to Weaver. In this application you can create, adapt and visualise weaving drafts. The drafts are made by a point and click interface but also include the possibility to replace a color in a bulk action. 
Drafts can be saved for continued work at a later time and for logged in users all created drafts can be seen and edited directly from the profile page. 
Out of the box this application supports drafts on between 2 and 24 treadles and shafts. 

#### [View the demonstration application here](https://nextweave.vercel.app/weaver)

## Functionality
The application pages for draft creation, draft library and calculations are available to all users and are nearly identical regardless of authentication status of the user. Save and load functionality in the draft page is mediated by local JSON files to unauthenticated users while authenticated users can store and retrieve their drafts from the connected database. 

The profile pages are only available to signed in users and contain pages for visualising, adding and editing resources owned by the user (drafts, looms and reeds).

## Getting started
Clone the repository from gitHub and navigate to the root folder:  

```git clone https://github.com/TereseBo/nextweave.git```  

```cd nextweave```  

To install requirements run:  

```npm i ```  

## Environment
The application requires sign up and registration with two external service providers. Clerk for authentication and MongoDB Atlas for database services. In order to run the application follow the description below to register with the providers, extract the required environment variables and add the them to the project. 

Create a file named  ```.env.local ```  

Clerk: is used to handle authentication. Signing up and register you application with Clerk: 
#### [Sign up for Clerk  here](https://clerk.com/)
Add the obtained public and private keys to the .env.local file.

MongoDB Atlas: is used to store all user created resources such as drafts looms and reeds. However users are completely managed by Clerk and not included in the weaver database. Sign up to recieve connection url and list both connection string and database name in .env.local
#### [Sign up for MongoDB Atlas here](https://www.mongodb.com/)

## Testing
Testing is implemented usig jest. All tests can be found in the designated folder in root. Unit tests are carried out on individual functions and components. 

Automatic tests are started with:  

```npm run test```
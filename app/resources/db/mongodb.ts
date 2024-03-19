//This file contains the logic for connecting to the MongoDB

import { MongoClient } from 'mongodb'

//Throw error if the connection string is missing
if (!process.env.DATABASE_URL) {
  throw new Error('Missing environment variable: DATABASE_URL')
}


//Connection url and db info is saved in .env for easy tracking and upddate
const uri = process.env.DATABASE_URL
const database = process.env.DATABASE_NAME

const options = {};
//client will be the MongoClient to which a connection can be made
let client;

//clientPromise is a module-scoped MongoClient promise which resolves to an established connection by the client
//(By exporting it from this module, the client can be shared across functions.)
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that only one connection is run at a time 
  //and is preserved across module reloads caused by HMR (Hot Module Replacement)
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production environment, do not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}



//We will only be using one database and can export the started connection so it does not need to be done in each file
async function dbConnection() {
  try {
    const connectedClient = await clientPromise;
    const db = connectedClient.db(database);

    return db

  } catch (e) {
    //TODO:Remove log when tested for production
    console.log(e);
    //Returning the error will make it catchable in the calling function
    return e
  }
}

export { clientPromise, dbConnection }
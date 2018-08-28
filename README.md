# Building a REST API with MongoDB
## Tutorial
All the code in this repository comes from the following tutorial:
[Building a REST API using Mongo DB](https://codeburst.io/building-a-rest-api-using-mongo-db-75cac3403fab)

Install dependencies: npm install

Start application: node app.js  
Stop: CTRL-C

## Installation
#### Setup: Installing MongoDB (macOS)
* [Install MongoDB Enterprise on macOS - MongoDB Docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-os-x/)
* [Installing MongoDB on a Mac - Treehouse](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
#### Debugging
* [MongoDB: exception in initAndListen: 20 Attempted to create a lock file on a read-only directory: /data/db, terminating](https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea)
* [Mongod complains that there is no /data/db folder](https://stackoverflow.com/questions/7948789/mongod-complains-that-there-is-no-data-db-folder)

Run the mongo daemon: mongod  
Run the mongo server: mongo

## Overall Debugging
* [(node:62285) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.](https://stackoverflow.com/questions/51583465/to-use-the-new-parser-pass-option-usenewurlparser-true-to-mongoclient-conn)
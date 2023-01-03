const MongoClient = require("mongodb").MongoClient;

// Server running
const url = 'mongodb+srv://minhhoang:thangngo12345@cluster0.lgnla.mongodb.net/?retryWrites=true&w=majority';

// Database name
const databasename = "test";

MongoClient.connect(url).then((client) => {

  // Connecting to the database
  const connect = client.db(databasename);

  // Database collection
  const collection = connect
    .collection("users");

  // Delete multiple documents having name GFG
  collection.deleteMany();

  console.log("Deletion Successful");

}).catch((err) => {
  // If error occurred show the error message
  console.log(err.Message);
})
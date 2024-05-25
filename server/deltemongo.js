// const { MongoClient } = require('mongodb');
// require('dotenv').config();

// // Database Name
// const dbName = 'test';

// // MongoDB Connection URI
// const uri = process.env.uri;

// async function deleteDatabase() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     // Connect to MongoDB
//     await client.connect();

//     // Select the database
//     const db = client.db(dbName);

//     // Drop the database
//     await db.dropDatabase();

//     console.log(`Database '${dbName}' deleted successfully.`);
//   } catch (error) {
//     console.error('Error deleting database:', error);
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// }

// module.exports = { deleteDatabase };

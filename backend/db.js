const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI =process.env.MONGO_DB_URI
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongo Successfully");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToMongo;

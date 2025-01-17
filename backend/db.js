
const result = require('dotenv').config();
console.log("dotenv result:", result);

const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI=process.env.MONGO_URI
//const mongoURI="mongodb+srv://haribelkamlekarmegha:i2yFYOM7QGvWVXCS@cluster0.liy5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(mongoURI)

//const mongoURI =process.env.MONGO_DB_URI
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongo Successfully");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToMongo;

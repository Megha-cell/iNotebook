const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI ="mongodb+srv://meghakamlekar123:XPBfMsrkOGhC5GJW@cluster0.v39vq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongo Successfully");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToMongo;

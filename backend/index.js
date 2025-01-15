require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
//var cors = require('cors')
const cors = require('cors');

connectToMongo(); // Establish MongoDB connection

const app = express();
const port = process.env.PORT || 5000;
//Available Routes
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://i-notebook-lsyj.vercel.app' // Deployed frontend on Vercel
];
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
//app.use(cors({ origin: 'https://i-notebook-one-delta.vercel.app' }))
app.use(express.json())//t be able to use req.body


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at ${port}`);
});

require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo(); // Establish MongoDB connection

const app = express();
const port = process.env.PORT || 5000;
//Available Routes
app.use(cors())
app.use(express.json())//t be able to use req.body


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.CONNECTION_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});

const userRouter = require('./routes/user');
const PORT = process.env.PORT || 5000;

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

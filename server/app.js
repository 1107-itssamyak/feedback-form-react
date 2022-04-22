const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const dotenv = require("dotenv");
dotenv.config({
    path: "./utils/config.env",
});

const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const uri = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(uri);
app.use('/users', userRouter);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
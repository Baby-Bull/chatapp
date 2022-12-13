const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../db/connectDb");
const cors = require('cors');

const arrayRouters = require("./router");
const { setupWss } = require("../../websocket");

const app = express();
const staticPort = 8000;
dotenv.config();

// enrole middlewares
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}
app.use(express.json());
app.options('*', cors());
app.use(cors());
app.use(allowCrossDomain);

// using routers
arrayRouters.map((router) => app.use(router.path, router.router))


const startServer = async () => {
    try {
        await connectDB(process.env.URL_DATABASE_MONGODB)
        app.listen(staticPort, () => { })
        setupWss();
    } catch (error) {
        console.log(error);
    }
};

startServer();

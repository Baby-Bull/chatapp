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
app.use(express.json());
app.use(cors());

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

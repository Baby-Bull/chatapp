const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../db/connectDb");

const arrayRouters = require("./router");

const app = express();
const staticPort = 8000;
dotenv.config();

// enrole middlewares
app.use(express.json());

// using routers
arrayRouters.map((router) => app.use(router.path, router.router))


const startServer = async () => {
    try {
        await connectDB(process.env.URL_DATABASE_MONGODB)
        app.listen(staticPort, () => { })
    } catch (error) {
        console.log(error);
    }
};

startServer();

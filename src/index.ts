import express from "express";
import mongoose from "mongoose";
import config from "./config";
import {apiRouter} from "./routes/api.routes";

const app = express();
app.use(express.json());                                //usa a biblioteca json;
app.use(apiRouter);



app.listen(config.PORT, async() => {
    console.log("Server functionando na porta: ", config.PORT);
    mongoose.connect(config.MONGO_URI);                               //conectar ao mongo;
});
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import {Movie} from "./models/movie.model"

const app = express();

app.use(express.json());                                    //usa a biblioteca json;

app.get("/", (req, res) => {
    res.sendStatus(200).json({
      Message: "Server Express Rodando."
    });
});

app.listen(config.PORT, async() => {
    console.log("Server functionando na porta: ", config.PORT);
    mongoose.connect(config.MONGO_URI);                               //conectar ao mongo;
});
import express from "express";

const app = express();

app.use(express.json());                                    //usa a biblioteca json;

app.get("/", (req, res) => {
    res.sendStatus(200).json({
      Message: "Server Express"
    });
});

const port = 5000;

app.listen(port, ()=>{
    console.log("Server functionando na porta: ", port);
});
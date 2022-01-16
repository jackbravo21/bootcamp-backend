import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { apiRouter } from './routes/api.routes';
import { extRouter } from './routes/external.routes';
import cors from "cors";
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(express.json());
app.use(apiRouter);
app.use(extRouter);
app.use(cors());

const ENV_VARS = {
    //port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    token_secret: process.env.TOKEN_SECRET
}

/*
//Apenas local (descomentar se for usar fora do AWS);

app.listen(ENV_VARS.port, async () => {
    console.log('Server funcionando na porta: ', ENV_VARS.port);

    if (ENV_VARS.mongoURI) {
        mongoose.connect(ENV_VARS.mongoURI);
    } else {
        console.log('Erro na conexão com DB.');
    }
});
*/

mongoose.connect(ENV_VARS.mongoURI as string);

//const serveless para o lambda AWS
export const handler = serverless(app, {callbackWaitsForEmptyEventLoop: false});

export { ENV_VARS }

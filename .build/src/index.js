"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_VARS = exports.handler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_routes_1 = require("./routes/api.routes");
const external_routes_1 = require("./routes/external.routes");
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(api_routes_1.apiRouter);
app.use(external_routes_1.extRouter);
app.use((0, cors_1.default)());
const ENV_VARS = {
    //port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    token_secret: process.env.TOKEN_SECRET
};
exports.ENV_VARS = ENV_VARS;
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
mongoose_1.default.connect(ENV_VARS.mongoURI);
//const serveless para o lambda AWS
exports.handler = (0, serverless_http_1.default)(app, { callbackWaitsForEmptyEventLoop: false });

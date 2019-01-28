import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { createServer } from 'tls';

import config from './config';

const app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

import routes from './routes';

//routes being called in as middleware with prefix route "/v1"
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Serving on Port: ${app.server.address().port}`);

export default app;
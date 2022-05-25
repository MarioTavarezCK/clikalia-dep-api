import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import ConnectionDB from './src/infraestructure/database/connection';
import { default as departmentsRouter } from './src/infraestructure/routes/departments';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

const connectionMongo = ConnectionDB.getInstance();

connectionMongo.connectToDB();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(
	cors({
		credentials: false,
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

app.use('/departments', departmentsRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

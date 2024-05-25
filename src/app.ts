import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import listRoutes from './routes/listRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json());

app.use('/list', listRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;

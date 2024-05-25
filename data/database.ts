import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

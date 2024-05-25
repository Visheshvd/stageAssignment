import mongoose from 'mongoose';
import User from '../src/models/user';
import { connectToDatabase } from './database';

const users = [
    {
        userId: 1,
        username: 'user1',
        preferences: {
            favoriteGenres: ['Action', 'Comedy'],
            dislikedGenres: ['Horror'],
        },
        watchHistory: [],
    },
    {
        userId: 2,
        username: 'user2',
        preferences: {
            favoriteGenres: ['Drama', 'Romance'],
            dislikedGenres: ['SciFi'],
        },
        watchHistory: [],
    },
];

const seedUsers = async () => {
    await connectToDatabase();
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users seeded');
    mongoose.disconnect();
};

seedUsers();

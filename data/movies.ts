import mongoose from 'mongoose';
import Movie from '../src/models/movie';
import { connectToDatabase } from './database';

const movies = [
    {
        title: 'Movie 1',
        description: 'Description of Movie 1',
        genres: ['Action'],
        releaseDate: new Date('2020-01-01'),
        director: 'Director 1',
        actors: ['Actor 1', 'Actor 2'],
    },
    {
        title: 'Movie 2',
        description: 'Description of Movie 2',
        genres: ['Comedy'],
        releaseDate: new Date('2021-01-01'),
        director: 'Director 2',
        actors: ['Actor 3', 'Actor 4'],
    },
];

const seedMovies = async () => {
    await connectToDatabase();
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log('Movies seeded');
    mongoose.disconnect();
};

seedMovies();

import mongoose from 'mongoose';
import TVShow from '../src/models/tvShow';
import { connectToDatabase } from './database';

const tvShows = [
    {
        title: 'TV Show 1',
        description: 'Description of TV Show 1',
        genres: ['Drama'],
        episodes: [
            {
                episodeNumber: 1,
                seasonNumber: 1,
                releaseDate: new Date('2020-01-01'),
                director: 'Director 1',
                actors: ['Actor 1', 'Actor 2'],
            },
            {
                episodeNumber: 2,
                seasonNumber: 1,
                releaseDate: new Date('2020-01-02'),
                director: 'Director 1',
                actors: ['Actor 1', 'Actor 2'],
            },
        ],
    },
    {
        title: 'TV Show 2',
        description: 'Description of TV Show 2',
        genres: ['Fantasy'],
        episodes: [
            {
                episodeNumber: 1,
                seasonNumber: 1,
                releaseDate: new Date('2021-01-01'),
                director: 'Director 2',
                actors: ['Actor 3', 'Actor 4'],
            },
        ],
    },
];

const seedTVShows = async () => {
    await connectToDatabase();
    await TVShow.deleteMany({});
    await TVShow.insertMany(tvShows);
    console.log('TV Shows seeded');
    mongoose.disconnect();
};

seedTVShows();

import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './genre';

interface IMovie extends Document {
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}

const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;
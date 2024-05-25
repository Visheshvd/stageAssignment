import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './genre';

interface IEpisode {
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
}

interface ITVShow extends Document {
    title: string;
    description: string;
    genres: Genre[];
    episodes: IEpisode[];
}

const EpisodeSchema: Schema = new Schema({
    episodeNumber: { type: Number, required: true },
    seasonNumber: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: { type: [String], required: true },
});

const TVShowSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], required: true },
    episodes: { type: [EpisodeSchema], required: true },
});

const TVShow = mongoose.model<ITVShow>('TVShow', TVShowSchema);
export default TVShow;

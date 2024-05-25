import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from './genre';

interface IUser extends Document {
    userId: Number
    username: string;
    preferences: {
        favoriteGenres: Genre[];
        dislikedGenres: Genre[];
    };
    watchHistory: {
        contentId: string;
        watchedOn: Date;
        rating?: number;
    }[];
}

const UserSchema: Schema = new Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    preferences: {
        favoriteGenres: { type: [String], required: true },
        dislikedGenres: { type: [String], required: true },
    },
    watchHistory: [
        {
            contentId: { type: String, required: true },
            watchedOn: { type: Date, required: true },
            rating: { type: Number },
        },
    ],
});

UserSchema.index({ userId: 1 }, { unique: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

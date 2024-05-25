import User from '../models/user';
import Movie from '../models/movie';
import TVShow from '../models/tvShow';
import redisClient from '../redisClient';

const CACHE_EXPIRATION = 3600; // Cache expiration time in seconds

export const addToList = async (userId: number, itemId: string, itemType: 'movie' | 'tvShow'): Promise<void> => {
    const user = await User.findOne({ userId: userId });
    if (!user) {
        throw new Error('User not found');
    }

    const itemIdentifier = itemType === 'movie' ? `movie_${itemId}` : `tvshow_${itemId}`;

    const itemExists = user.watchHistory.some(item => item.contentId === itemIdentifier);
    if (itemExists) {
        throw new Error('Item already in the list');
    }

    const item = { contentId: itemIdentifier, watchedOn: new Date() };
    user.watchHistory.push(item);
    await user.save();

    // Invalidate cache
    await redisClient.del(`user_${userId}`);
};

export const removeFromList = async (userId: number, itemId: string): Promise<void> => {
    const user = await User.findOne({ userId: userId });
    if (!user) {
        throw new Error('User not found');
    }

    const itemIndex = user.watchHistory.findIndex(item => item.contentId === itemId);
    if (itemIndex === -1) {
        throw new Error('Item not found in the list');
    }

    user.watchHistory.splice(itemIndex, 1);
    await user.save();

    // Invalidate cache
    await redisClient.del(`user_${userId}`);
};

const getItemDetails = async (contentId: string): Promise<any> => {
    const cacheKey = `content_${contentId}`;
    const cachedContent = await redisClient.get(cacheKey);

    if (cachedContent) {
        return JSON.parse(cachedContent);
    }

    let detailedItem;
    if (contentId.startsWith('movie_')) {
        detailedItem = await Movie.findById(contentId.replace('movie_', ''));
    } else if (contentId.startsWith('tvshow_')) {
        detailedItem = await TVShow.findById(contentId.replace('tvshow_', ''));
    }

    if (detailedItem) {
        await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(detailedItem));
    }

    return detailedItem;
};

export const listItems = async (userId: number, page: number = 1, limit: number = 10): Promise<any[]> => {
    // Try to get cached data
    const cachedUser = await redisClient.get(`user_${userId}`);
    let user;

    if (cachedUser) {
        user = JSON.parse(cachedUser);
    } else {
        user = await User.findOne({ userId: userId });
        if (!user) {
            throw new Error('User not found');
        }
        // Cache the user data
        await redisClient.setEx(`user_${userId}`, CACHE_EXPIRATION, JSON.stringify(user));
    }

    const items = user.watchHistory.slice((page - 1) * limit, page * limit);

    const detailedItems = await Promise.all(
        items.map(async (item: { contentId: string; }) => {
            return await getItemDetails(item.contentId);
        })
    );

    return detailedItems;
};

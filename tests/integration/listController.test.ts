import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('List Controller', () => {
    it('should add an item to the list', async () => {
        const response = await request(app).post('/list/add').send({ userId: 1, itemId: '6651afc72d249b9d0467c6ae', itemType: 'tvShow' });
        expect(response.status).toBe(200);
        expect(response.text).toBe('Item added to list');
    });

    it('should remove an item from the list', async () => {
        const response = await request(app).post('/list/remove').send({ userId: 1, itemId: 'tvshow_6651afc72d249b9d0467c6ae' }); //itemId here is the contentid in watchedHistory of user model
        expect(response.status).toBe(200);
        expect(response.text).toBe('Item removed from list');
    });

    it('should list items in the list', async () => {
        const response = await request(app).get('/list/items').query({ userId: 1, page: 1, limit: 10 });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

const request = require('supertest');

const baseURL = 'http://localhost:5000';

describe('GET /', () => {
    test('should return status 200 for admin login page', async() =>{
        const res = await request(baseURL).get('/admin/');
        expect(res.status).toEqual(200);
    });
});
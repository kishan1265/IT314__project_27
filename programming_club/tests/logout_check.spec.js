  const request = require('supertest');
  
  const baseURL = 'http://localhost:5000';
  
  describe('Logging out', () => {
    test('should redirect to login page when user clicks logout button', async () => {

      const res = await request(app).get('users/logout');
      expect(res.status).toEqual(302);
      expect(res.headers.location).toEqual('/');
    });
  });
  
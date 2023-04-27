const request = require('supertest');
const baseURL = 'https://programming-club-daiict.up.railway.app';

describe('POST /feedback', () => {
  test('should create a new feedback and redirect', async () => {
    const body = {
      title: 'Test Feedback',
      feedback: 'This is a test feedback',
    };
    const user = {
      email: '202001265@daiict.ac.in',
      name: 'Kishan Sangani',
    };

    const res = await request(baseURL).post('/feedback');

    expect(res.status).toBe(302);
    // expect(saveMock).toHaveBeenCalled();
    // expect(saveMock.mock.calls[0][0]).toMatchObject({
    //   title: feedback.title,
    //   email: user.email,
    //   name: user.name,
    //   feedback: feedback.feedback,
    // });
  });

  // test('should return an error message when given invalid input', async () => {
  //   const feedback = {
  //     title: '',
  //     feedback: '',
  //   };
  //   const errors = [{ msg: 'Please enter all fields' }];

  //   const renderMock = jest.spyOn(res, 'render');

  //   const res = await request(app).post('/feedback').send(feedback);

  //   expect(res.status).toBe(200);
  //   expect(renderMock).toHaveBeenCalledWith('user_feedback', {
  //     errors,
  //     title: feedback.title,
  //     feedback: feedback.feedback,
  //   });
  // });
});

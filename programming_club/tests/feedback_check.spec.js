const request = require('supertest');
const app = require('./app'); // assuming your app is defined in a separate file
const Feedback = require('./models/Feedback'); // assuming you have a Feedback model defined in a separate file

describe('POST /feedback', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // reset any mock functions before each test
  });

  test('should create a new feedback entry when given valid input', async () => {
    const feedback = {
      title: 'Test Feedback',
      feedback: 'This is a test feedback',
    };
    const user = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const saveMock = jest.spyOn(Feedback.prototype, 'save');

    const res = await request(app)
      .post('/feedback')
      .send(feedback)
      .set('Cookie', [`connect.sid=test; email=${user.email}; name=${user.name}`]);

    expect(res.status).toBe(302);
    expect(saveMock).toHaveBeenCalled();
    expect(saveMock.mock.calls[0][0]).toMatchObject({
      title: feedback.title,
      email: user.email,
      name: user.name,
      feedback: feedback.feedback,
    });
  });

  test('should return an error message when given invalid input', async () => {
    const feedback = {
      title: '',
      feedback: '',
    };
    const errors = [{ msg: 'Please enter all fields' }];

    const renderMock = jest.spyOn(res, 'render');

    const res = await request(app).post('/feedback').send(feedback);

    expect(res.status).toBe(200);
    expect(renderMock).toHaveBeenCalledWith('user_feedback', {
      errors,
      title: feedback.title,
      feedback: feedback.feedback,
    });
  });
});
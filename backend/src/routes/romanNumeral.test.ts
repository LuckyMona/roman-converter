import request from 'supertest';
import express from 'express';

/**
 * 1) Mock the convertToRoman function before importing the router,
 *    so that the router picks up the mock.
 */
jest.mock('../utils/converter', () => ({
  convertToRoman: jest.fn((num: number) => {
    // If num === 10, throw to simulate internal error
    if (num === 10) {
      throw new Error('Internal Server Error');
    }
    // If num === 12, return "XII" for our success test
    if (num === 12) {
      return 'XII';
    }
    // Otherwise, just return "X"
    return 'X';
  }),
}));

// 2) Import the router AFTER mocking
import router from './romanNumeral';

// 3) Create a test Express app
const app = express();
app.use('/', router);

jest.setTimeout(10000);

describe('GET /romannumeral', () => {
  test('Should convert 12 to XII', async () => {
    const response = await request(app).get('/romannumeral?query=12');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: '12', output: 'XII' });
  });

  test('Should return 400 if query param is missing', async () => {
    const response = await request(app).get('/romannumeral');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please enter a number between 1 and 3999 (no decimals).',
    });
  });

  test('Should return 400 for non-numeric input (hello)', async () => {
    const response = await request(app).get('/romannumeral?query=hello');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please enter a number between 1 and 3999 (no decimals).',
    });
  });

  test('Should return 400 for negative numbers (-5)', async () => {
    const response = await request(app).get('/romannumeral?query=-5');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please enter a number between 1 and 3999 (no decimals).',
    });
  });

  test('Should return 400 for numbers greater than 3999 (4000)', async () => {
    const response = await request(app).get('/romannumeral?query=4000');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please enter a number between 1 and 3999 (no decimals).',
    });
  });

  test('Should return 400 for decimal values (12.5)', async () => {
    const response = await request(app).get('/romannumeral?query=12.5');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please enter a number between 1 and 3999 (no decimals).',
    });
  });

  test('Should return 405 for non-GET requests (POST)', async () => {
    const response = await request(app).post('/romannumeral');
    expect(response.status).toBe(405);
    expect(response.body).toEqual({ error: 'Method Not Allowed' });
  });

  test('Should return 500 when `convertToRoman` throws an error', async () => {
    // Our mock throws if num === 10
    const response = await request(app).get('/romannumeral?query=10');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});

const request = require('supertest');
const app = require('./server'); // Assuming your server file is named server.js

// Mock MySQL connection
jest.mock('mysql', () => {
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn(),
      query: jest.fn(),
      on: jest.fn(),
    })),
  };
});

describe('GET /', () => {
  it('should respond with status 200 and list of users', async () => {
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

    // Mock MySQL query result
    app.locals.connection.query.mockImplementation((query, callback) => {
      callback(null, users);
    });

    // Make a GET request to the server
    const response = await request(app).get('/');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });
});

describe('GET /test', () => {
  it('should respond with status 200 and "Hello world"', async () => {
    // Make a GET request to the server
    const response = await request(app).get('/test');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
  });
});

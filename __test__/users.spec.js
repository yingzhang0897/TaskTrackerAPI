const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let connection;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  if (connection) await connection.close();
});

describe('User Routes - GET Endpoints', () => {
  test('GET /users should return all users', async () => {
    const res = await request.get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /users/:id with invalid ID should return 400', async () => {
    const res = await request.get('/users/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /users/:id with valid existing ID should return a user', async () => {
    const users = (await request.get('/users')).body;
    if (users.length > 0) {
      const id = users[0]._id;
      const res = await request.get(`/users/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', id);
    } else {
      console.warn('No users in DB to test GET /users/:id');
    }
  });
});

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

describe('Group Routes - GET Endpoints', () => {
  test('GET /groups should return all groups', async () => {
    const res = await request.get('/groups');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /groups/:id with invalid ID should return 400', async () => {
    const res = await request.get('/groups/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /groups/:id with valid existing ID should return a group', async () => {
    const groups = (await request.get('/groups')).body;
    if (groups.length > 0) {
      const id = groups[0]._id;
      const res = await request.get(`/groups/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', id);
    } else {
      console.warn('No groups in DB to test GET /groups/:id');
    }
  });
});

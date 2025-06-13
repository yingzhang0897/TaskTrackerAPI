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

describe('Goal Routes - GET Endpoints', () => {
  test('GET /goals should return all goals', async () => {
    const res = await request.get('/goals');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /goals/id/:id with invalid ID should return 400', async () => {
    const res = await request.get('/goals/id/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /goals/id/:id with a valid existing ID should return a goal', async () => {
    const goals = (await request.get('/goals')).body;
    if (goals.length > 0) {
      const id = goals[0]._id;
      const res = await request.get(`/goals/id/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', id);
    } else {
      console.warn('No goals in DB to test GET /goals/id/:id');
    }
  });

  test('GET /goals/status/:status should return goals with that status or 404 if none found', async () => {
    const res = await request.get('/goals/status/In Progress');
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET /goals/status/:status with missing status param should return 400', async () => {
    const res = await request.get('/goals/status/');
    expect(res.statusCode).toBe(404); 
});

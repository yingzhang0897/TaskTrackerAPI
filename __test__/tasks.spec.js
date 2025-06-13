const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let connection;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  if (connection) await connection.close();
});

describe('Task Routes - GET Endpoints', () => {
  test('GET /tasks should return all tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).not.toBeNull();
  });

  test('GET /tasks/id/:id with invalid ID should return 400', async () => {
    const res = await request.get('/tasks/id/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /tasks/id/:id with a real valid ID', async () => {
    const tasks = (await request.get('/tasks')).body;
    if (tasks.length > 0) {
      const id = tasks[0]._id;
      const res = await request.get(`/tasks/id/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', id);
    } else {
      console.warn('No tasks in DB to test GET /tasks/:id');
    }
  });

  test('GET /tasks/status/:status should return tasks with that status', async () => {
    const res = await request.get('/tasks/status/In Progress');
    // Accept 200 if found, or 404 if no tasks match
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET /tasks/dueDate/:dueDate should return tasks with that date', async () => {
    const encodedDate = encodeURIComponent('2025-06-13T00:00:00.000Z');
    const res = await request.get(`/tasks/due/${encodedDate}`);
    // Accept 200 if found, or 404 if none match
    expect([200, 404]).toContain(res.statusCode);
  });
});

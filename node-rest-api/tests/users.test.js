process.env.NODE_ENV = 'test';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
const { default: app } = await import('../src/app.js');

test('health check', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
});

test('user CRUD', async () => {
  const created = await request(app).post('/api/v1/users').send({ name: 'Dharma', email: 'd@x.com' });
  assert.equal(created.status, 201);
  const id = created.body.id;

  assert.equal((await request(app).get(`/api/v1/users/${id}`)).status, 200);
  assert.equal((await request(app).put(`/api/v1/users/${id}`).send({ name: 'D' })).body.name, 'D');
  assert.equal((await request(app).delete(`/api/v1/users/${id}`)).status, 204);
  assert.equal((await request(app).get(`/api/v1/users/${id}`)).status, 404);
});

test('validation error', async () => {
  const res = await request(app).post('/api/v1/users').send({});
  assert.equal(res.status, 400);
});

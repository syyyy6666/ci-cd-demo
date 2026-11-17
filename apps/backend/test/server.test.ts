import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp, VERSION } from '../src/app.js';

const app = createApp();

describe('backend API', () => {
  it('GET /health returns ok with 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });

  it('GET /api/hello returns JSON message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello from ECS backend' });
  });

  it('GET /api/version returns current version', async () => {
    const res = await request(app).get('/api/version');
    expect(res.status).toBe(200);
    expect(res.text).toBe(VERSION);
  });
});

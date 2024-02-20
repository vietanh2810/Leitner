import { Router } from 'express';
import request from 'supertest';
import app from '../../app.js';

// Créez une instance de Router
const indexRouter = Router();

indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

describe('Index Router', () => {
  it('GET / should respond with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('GET / should render index page with correct title', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Express');
  });
});

import { Router } from 'express';
import request from 'supertest';
import app from '../../app.js';

// Créez une instance de Router
const router = Router();

// Utilisez le Router
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//  tests Jest
describe('Users Router', () => {
  it('GET / should respond with status code 200', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  it('GET / should respond with "respond with a resource"', async () => {
    const response = await request(app).get('/users');
    expect(response.text).toBe('respond with a resource');
  });
});

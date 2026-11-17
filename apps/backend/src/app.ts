import express from 'express';

export const VERSION = '1.0.0';

export function createApp() {
  const app = express();

  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from ECS backend' });
  });

  app.get('/health', (_req, res) => {
    res.status(200).send('ok');
  });

  app.get('/api/version', (_req, res) => {
    res.send(String(VERSION));
  });

  return app;
}

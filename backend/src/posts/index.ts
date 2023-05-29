import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
}

const posts: { [key: string]: Post } = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (_req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', async (req: Request, res: Response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

app.post('/events', (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

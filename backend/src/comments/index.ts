import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

interface Comment {
  id: string;
  content: string;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});

app.post('/events', (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

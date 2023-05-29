import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  postId: string;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: Post } = {};

app.get('/posts', (_req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({
      id,
      content,
      postId,
    });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});

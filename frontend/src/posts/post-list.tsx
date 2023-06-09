import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentCreate } from '../comments/comment-create';
import { CommentList } from '../comments/comment-list';

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>({} as [Post]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = Object.values(posts).map((post: Post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}>
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderPosts}
      </div>
    </div>
  );
};

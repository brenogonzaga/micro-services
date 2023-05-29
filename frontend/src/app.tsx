import { PostCreate } from './posts/post-create';
import { PostList } from './posts/post-list';

export const App = () => {
  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

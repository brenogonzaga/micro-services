import { useState } from 'react';
import axios from 'axios';

export const CommentCreate = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='content'>New Comment</label>
          <input
            type='text'
            className='form-control'
            id='content'
            value={content}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

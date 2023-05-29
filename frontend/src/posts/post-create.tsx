import { useState } from 'react';
import axios from 'axios';

export const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title,
    });
    setTitle('');
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            id='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

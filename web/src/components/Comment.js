import { useRef } from 'react';

const Comment = ({ onSave }) => {
  const name = useRef();
  const email = useRef();
  const comment = useRef();

  const resetForm = () => {
    name.current.value = '';
    email.current.value = '';
    comment.current.value = '';
  };

  const handleSave = () => {
    onSave &&
      onSave({
        name: name.current.value,
        email: email.current.value,
        comment: comment.current.value,
      });
    resetForm();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input ref={name} type="text" placeholder="Name" />
      </div>
      <div>
        <input ref={email} type="text" placeholder="Email" />
      </div>
      <div>
        <textarea ref={comment} placeholder="Your thoughts?"></textarea>
      </div>
      <button onClick={handleSave}>Add</button>
    </form>
  );
};

export default Comment;

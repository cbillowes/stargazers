import { useRef } from 'react';
import { Button, Form, TextArea, TextBox } from './Controls';

const Comment = ({ commentOn, onSave }) => {
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
    <Form title={<span> What did you think? 💭</span>}>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextBox
          ref={email}
          label="Your email address"
          type="email"
          placeholder="For feedback only"
        />
        <TextBox
          ref={name}
          label="Your name"
          isRequired
          type="text"
          placeholder="Appears on your comment"
        />
        <TextArea
          ref={comment}
          label="Your comment"
          isRequired
          rows="10"
          placeholder={`Publicly share what you think about ${
            commentOn || 'this topic'
          }`}
        />
        <Button onClick={handleSave}>Save</Button>
      </form>
    </Form>
  );
};

export default Comment;

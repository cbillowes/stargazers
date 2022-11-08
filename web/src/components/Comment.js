import { useRef } from 'react';
import { Button, Form, TextArea } from './Controls';

const Comment = ({ user, commentOn, onSave }) => {
  const comment = useRef();

  if (!user) return <></>;

  const handleSave = () => {
    onSave &&
      onSave({
        name: user.email,
        comment: comment.current.value,
      });
  };

  return (
    <Form title={<span> What did you think? 💭</span>}>
      <form onSubmit={(e) => e.preventDefault()}>
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

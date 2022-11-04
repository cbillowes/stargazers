const Comments = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>There are no comments yet</div>;
  }

  return data
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ name, comment, timestamp }, i) => {
      return (
        <div key={i}>
          <div>
            <div>{timestamp}</div>
            <strong>Name</strong>: {name}
          </div>
          <div>{comment}</div>
        </div>
      );
    });
};

export default Comments;

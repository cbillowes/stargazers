import { Form } from "./Controls";

const format = (timestamp) => {
  const dtFormat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'long',
    timeZone: 'UTC'
  });

  return dtFormat.format(new Date(timestamp));
}

const Comments = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>There are no comments yet</div>;
  }

  return data
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ name, comment, timestamp }, i) => {
      return (
        <Form title={format(timestamp)} key={i}>
          <blockquote className="w-full">
            <div className="leading-loose">{comment}</div>
            <cite>— {name}</cite>
          </blockquote>
        </Form>
      );
    });
};

export default Comments;

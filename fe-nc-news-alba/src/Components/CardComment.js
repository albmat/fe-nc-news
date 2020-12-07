const CardComment = ({ comment }) => {
  return (
    <div className='CardComment'>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      <p>by {comment.author}</p>
      <p>created at {comment.created_at}</p>
    </div>
  );
};

export default CardComment;

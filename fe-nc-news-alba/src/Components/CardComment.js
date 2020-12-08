import moment from 'moment';

const CardComment = ({ comment, updateCommentVotes, deleteComment }) => {
  return (
    <div className='CardComment'>
      <button
        className='ButtonDeleteComment'
        onClick={() => deleteComment(comment.comment_id)}
      >
        x
      </button>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      <button onClick={() => updateCommentVotes(comment.comment_id, 1)}>
        +
      </button>
      <button onClick={() => updateCommentVotes(comment.comment_id, -1)}>
        -
      </button>
      <p>by {comment.author}</p>
      <p>
        created at{' '}
        {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}
      </p>
    </div>
  );
};

export default CardComment;

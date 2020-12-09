import moment from 'moment';
import Voter from './Voter';

const CardComment = ({ comment, deleteComment }) => {
  return (
    <div className='CardComment'>
      <button
        className='ButtonDeleteComment'
        onClick={() => deleteComment(comment.comment_id)}
      >
        x
      </button>
      <p>{comment.body}</p>
      <Voter place='comment' id={comment.comment_id} votes={comment.votes} />
      <p>by {comment.author}</p>
      <p>
        created at{' '}
        {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}
      </p>
    </div>
  );
};

export default CardComment;

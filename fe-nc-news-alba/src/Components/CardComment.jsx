import moment from 'moment';
import Voter from './Voter';

const CardComment = ({ comment, deleteComment, loggedUser }) => {
  return (
    <div className='CardComment'>
      {loggedUser === comment.author ? (
        <button
          className='ButtonDeleteComment'
          onClick={() => deleteComment(comment.comment_id)}
        >
          x
        </button>
      ) : null}

      <p>{comment.body}</p>
      <Voter place='comments' id={comment.comment_id} votes={comment.votes} />
      <p>by {comment.author}</p>
      <p>
        created at{' '}
        {moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}
      </p>
    </div>
  );
};

export default CardComment;

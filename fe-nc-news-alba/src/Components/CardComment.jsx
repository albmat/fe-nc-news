import moment from 'moment';
import Voter from './Voter';
import React, { useContext } from 'react';
import { UserContext } from '../Context/User';

const CardComment = ({ comment, deleteComment }) => {
  const { loggedUser } = useContext(UserContext);

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

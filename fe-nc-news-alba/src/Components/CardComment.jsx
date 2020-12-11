import moment from 'moment';
import Voter from './Voter';
import React, { useContext } from 'react';
import { UserContext } from '../Context/User';

const CardComment = ({ comment, deleteComment }) => {
  const { loggedUser } = useContext(UserContext);
  const { author, comment_id, body, votes, created_at } = comment;

  return (
    <div className='CardComment'>
      {loggedUser === author ? (
        <button
          className='ButtonDeleteComment'
          onClick={() => deleteComment(comment_id)}
        >
          x
        </button>
      ) : null}

      <p>{body}</p>
      <Voter place='comments' id={comment_id} votes={votes} />
      <p>by {author}</p>
      <p>created at {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
};

export default CardComment;

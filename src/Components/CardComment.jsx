import moment from 'moment';
import Voter from './Voter';
import React, { useContext } from 'react';
import { UserContext } from '../Context/User';

const CardComment = ({ comment, deleteComment }) => {
  const { loggedUser } = useContext(UserContext);
  const { author, comment_id, body, votes, created_at } = comment;

  return (
    <div className='CardComment'>
      {loggedUser === author && (
        <button
          className='ButtonDeleteComment'
          onClick={() => deleteComment(comment_id)}
        >
          x
        </button>
      )}
      <div className='CommentDiv'>
        <p>Posted by {author}</p>
        <p>created at {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
      <p className='CommentBody'>{body}</p>
      <Voter place='comments' id={comment_id} votes={votes} />
    </div>
  );
};

export default CardComment;

import { Link } from '@reach/router';
import moment from 'moment';
import { AiOutlineComment } from 'react-icons/ai';
import { FiThumbsUp } from 'react-icons/fi';

const CardArticle = ({ article }) => {
  const {
    title,
    topic,
    votes,
    author,
    created_at,
    article_id,
    comment_count
  } = article;
  return (
    <div className='CardArticle'>
      <div className='ArticleDiv'>
        <p>
          Posted by{' '}
          <Link className='Link' to={`/articlesby/${author}`}>
            {author}
          </Link>
        </p>
        <p>created at {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>{topic}</p>
        <p>
          {votes} <FiThumbsUp />
        </p>
      </div>
      <h4 className='Title'>{title}</h4>
      <div className='ArticleDiv'>
        <p>
          <AiOutlineComment /> {comment_count} comments
        </p>
        <Link to={`/article/${article_id}`}>
          <button className='DisplayArticle'>+Info</button>
        </Link>
      </div>
    </div>
  );
};

export default CardArticle;

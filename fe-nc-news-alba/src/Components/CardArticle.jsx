import { Link } from '@reach/router';
import moment from 'moment';

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
      <p>{title}</p>
      <p>{topic}</p>
      <p>{votes} votes</p>
      <p>
        by{' '}
        <Link className='Link' to={`/articlesby/${author}`}>
          {author}
        </Link>
      </p>
      <p>created at {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>{comment_count} comments</p>
      <Link to={`/article/${article_id}`}>
        <button>+Info</button>
      </Link>
    </div>
  );
};

export default CardArticle;

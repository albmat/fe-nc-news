import { Link } from '@reach/router';
import moment from 'moment';

const CardArticle = ({ article }) => {
  return (
    <div className='CardArticle'>
      <p>{article.title}</p>
      <p>{article.topic}</p>
      <p>{article.votes} votes</p>
      <p>
        by{' '}
        <Link className='Link' to={`/articlesby/${article.author}`}>
          {article.author}
        </Link>
      </p>
      <p>
        created at{' '}
        {moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}
      </p>
      <p>{article.comment_count} comments</p>
      <Link to={`/article/${article.article_id}`}>
        <button>+Info</button>
      </Link>
    </div>
  );
};

export default CardArticle;

import { Link } from '@reach/router';

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
      <p>{article.comment_count} comments</p>
      <Link to={`/article/${article.article_id}`}>
        <button>+Info</button>
      </Link>
    </div>
  );
};

export default CardArticle;

import { Link } from '@reach/router';

const CardArticle = ({ article }) => {
  return (
    <div className='CardArticle'>
      <p>{article.title}</p>
      <p>{article.topic}</p>
      <p>{article.votes} votes</p>
      <p>by {article.author}</p>
      <p>{article.comment_count} comments</p>
      <Link to={`/articles/${article.article_id}`}>
        <button>+Info</button>
      </Link>
    </div>
  );
};

export default CardArticle;

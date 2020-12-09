import React from 'react';
import * as api from '../api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Voter from './Voter';
import moment from 'moment';
import { Link } from '@reach/router';

class ArticleInfo extends React.Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    api
      .getArticleById(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText }
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Article nof found... ${status}!! ${statusText}`
        });
      });
  }

  render() {
    const { article, hasError, errorMessage, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className='ArticleInfo'>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <p>by {article.author}</p>
          <p>
            created at{' '}
            {moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </p>
          <Voter
            place='article'
            id={article.article_id}
            votes={article.votes}
          />
          <p>{article.comment_count} comments</p>
          <Link to={`/articles/${article.article_id}/comments`}>
            <button>All comments</button>
          </Link>
        </div>
      );
    }
  }
}

export default ArticleInfo;

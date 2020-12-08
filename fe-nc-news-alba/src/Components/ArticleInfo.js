import React from 'react';
import * as api from '../api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
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

  componentDidUpdate(prevProps, prevState) {
    const newVotes = prevState.article.votes !== this.state.article.votes;
    if (newVotes) {
      api.getArticleById(this.props.article_id).then((article) => {
        this.setState({ article, isLoading: false });
      });
    }
  }

  updateArticleVotes = (vote) => {
    api
      .patchArticleVotes(this.state.article.article_id, vote)
      .then((article) => {
        this.setState({ article, isLoading: false });
      });
  };

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
          <p>at {article.created_at}</p>
          <p>{article.votes} votes</p>
          <button onClick={() => this.updateArticleVotes(1)}>+</button>
          <button onClick={() => this.updateArticleVotes(-1)}>-</button>
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

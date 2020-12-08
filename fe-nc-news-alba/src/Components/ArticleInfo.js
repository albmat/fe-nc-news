import React from 'react';
import * as api from '../api';
import Loading from './Loading';
import { Link } from '@reach/router';

class ArticleInfo extends React.Component {
  state = {
    article: {},
    isLoading: true
  };

  componentDidMount() {
    api.getArticleById(this.props.article_id).then((article) => {
      this.setState({ article, isLoading: false });
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
    const {
      article_id,
      title,
      body,
      author,
      created_at,
      votes,
      comment_count
    } = this.state.article;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='ArticleInfo'>
          <h3>{title}</h3>
          <p>{body}</p>
          <p>by {author}</p>
          <p>at {created_at}</p>
          <p>{votes} votes</p>
          <button onClick={() => this.updateArticleVotes(1)}>+</button>
          <button onClick={() => this.updateArticleVotes(-1)}>-</button>
          <p>{comment_count} comments</p>
          <Link to={`/articles/${article_id}/comments`}>
            <button>All comments</button>
          </Link>
        </div>
      );
    }
  }
}

export default ArticleInfo;

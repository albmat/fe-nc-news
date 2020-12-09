import React from 'react';
import * as api from '../api';
import CardArticle from './CardArticle';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import NavBarFilter from './NavBarFilter';

class ListArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopic = prevProps.topic_slug !== this.props.topic_slug;
    if (newTopic) {
      this.getArticles();
    }

    const newAuthor = prevProps.username !== this.props.username;
    if (newAuthor) {
      this.getArticles();
    }
  }

  getArticles = (
    params = {
      topic: this.props.topic_slug,
      author: this.props.username
    }
  ) => {
    api
      .getAllArticles(params)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText }
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Articles nof found... ${status}!! ${statusText}`
        });
      });
  };

  render() {
    const { articles, hasError, errorMessage, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className='ListArticles'>
          <NavBarFilter getArticles={this.getArticles} />
          <p className='CountP'>
            Post {articles.length} articles{' '}
            {this.props.topic_slug || this.props.username ? (
              <span>by {this.props.topic_slug || this.props.username}</span>
            ) : null}
          </p>

          {articles.map((article) => {
            return <CardArticle key={article.article_id} article={article} />;
          })}
        </div>
      );
    }
  }
}

export default ListArticles;

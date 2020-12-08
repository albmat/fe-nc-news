import React from 'react';
import * as api from '../api';
import CardArticle from './CardArticle';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

class ListArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    api
      .getAllArticles()
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
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopic = prevProps.topic_slug !== this.props.topic_slug;
    if (newTopic) {
      api.getAllArticles(this.props.topic_slug).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    const { articles, hasError, errorMessage, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className='ListArticles'>
          {articles.map((article) => {
            return <CardArticle key={article.article_id} article={article} />;
          })}
        </div>
      );
    }
  }
}

export default ListArticles;

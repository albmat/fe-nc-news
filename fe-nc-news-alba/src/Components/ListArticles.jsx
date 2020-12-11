import React from 'react';
import * as api from '../api';
import CardArticle from './CardArticle';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import NavBarFilter from './NavBarFilter';
import FormArticle from './FormArticle';

class ListArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    isToggleOn: true,
    hasError: false,
    errorMessage: '',
    isCreated: false
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopic = prevProps.topic_slug !== this.props.topic_slug;
    const newAuthor = prevProps.username !== this.props.username;

    if (newTopic || newAuthor) {
      this.getArticles();
    }
  }

  handleClick = () => {
    this.setState((currState) => ({
      isToggleOn: !currState.isToggleOn,
      isCreated: false
    }));
  };

  getArticles = (
    params = {
      topic: this.props.topic_slug,
      author: this.props.username,
      sort_by: 'created_at',
      order: 'asc'
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

  addArticle = (newArticle) => {
    this.setState((currState) => {
      const newState = {
        articles: [newArticle, ...currState.articles],
        isLoading: false,
        isToggleOn: true,
        isCreated: true
      };
      return newState;
    });
  };

  render() {
    const {
      articles,
      hasError,
      errorMessage,
      isLoading,
      isToggleOn,
      isCreated
    } = this.state;
    const { topic_slug, username } = this.props;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className='ListArticles'>
          <NavBarFilter
            topic={topic_slug}
            author={username}
            getArticles={this.getArticles}
          />
          {isToggleOn ? (
            <button className='ButtonPost' onClick={this.handleClick}>
              Post article
            </button>
          ) : (
            <FormArticle addArticle={this.addArticle} />
          )}
          {isCreated && (
            <ErrorMessage errorMessage='This article has been successfully post' />
          )}
          <p className='CountP'>
            Post {articles.length} articles{' '}
            {topic_slug ||
              (username && <span>by {topic_slug || username}</span>)}
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

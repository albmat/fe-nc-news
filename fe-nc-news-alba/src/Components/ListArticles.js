import React from 'react';
import * as api from '../api';
import CardArticle from './CardArticle';
import Loading from './Loading';

class ListArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    api.getAllArticles().then((articles) => {
      this.setState({ articles, isLoading: false });
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
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='ListArticles'>
          {this.state.articles.map((article) => {
            return <CardArticle key={article.article_id} article={article} />;
          })}
        </div>
      );
    }
  }
}

export default ListArticles;

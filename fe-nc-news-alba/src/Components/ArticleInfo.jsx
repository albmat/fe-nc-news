import React from 'react';
import * as api from '../api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Voter from './Voter';
import moment from 'moment';
import { Link } from '@reach/router';
import { UserContext } from '../Context/User';
import ListComments from '../Components/ListComments';
import { Router } from '@reach/router';
import { AiOutlineComment } from 'react-icons/ai';

class ArticleInfo extends React.Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errorMessage: '',
    isDeleted: false
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
          errorMessage: `Article not found... ${status}!! ${statusText}`
        });
      });
  }

  deleteArticle = (id) => {
    api
      .deleteArticle(id)
      .then(() => {
        this.setState({ isDeleted: true });
      })
      .catch((err) => {
        const {
          response: { status, statusText }
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Article not found... ${status}!! ${statusText}`
        });
      });
  };

  render() {
    const {
      article,
      hasError,
      errorMessage,
      isLoading,
      isDeleted
    } = this.state;

    const { loggedUser } = this.context;

    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else if (isDeleted) {
      return <ErrorMessage errorMessage='This article has been removed!!' />;
    } else {
      return (
        <div className='ArticleInfoDiv'>
          <div className='ArticleInfo'>
            <h3>{article.title}</h3>
            <p className='ArticleBody'>{article.body}</p>
            <div className='ArticleDiv'>
              <p>by {article.author}</p>
              <p>
                created at{' '}
                {moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>

            <Voter
              place='articles'
              id={article.article_id}
              votes={article.votes}
            />
            <p>
              <AiOutlineComment /> {article.comment_count} comments
            </p>
            <Link to={`/article/${article.article_id}/comments`}>
              <button>All comments</button>
            </Link>
            {loggedUser === article.author && (
              <button
                className='ButtonDeleteArticle'
                onClick={() => this.deleteArticle(article.article_id)}
              >
                Delete
              </button>
            )}
          </div>
          <Router primary={false}>
            <ListComments path='/comments' />
          </Router>
        </div>
      );
    }
  }
}

ArticleInfo.contextType = UserContext;

export default ArticleInfo;

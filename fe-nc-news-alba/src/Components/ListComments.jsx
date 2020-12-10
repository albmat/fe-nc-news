import React from 'react';
import CardComment from './CardComment';
import FormComment from './FormComment';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import * as api from '../api';

class ListComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    isToggleOn: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    api
      .getAllCommentsByArticle(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText }
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Comments nof found... ${status}!! ${statusText}`
        });
      });
  }

  handleClick = () => {
    this.setState((currState) => ({
      isToggleOn: !currState.isToggleOn
    }));
  };

  addComment = (newComment) => {
    this.setState((currState) => {
      const newState = {
        comments: [newComment, ...currState.comments],
        isLoading: false,
        isToggleOn: true
      };
      return newState;
    });
  };

  deleteComment = (id) => {
    api.deleteComment(id).then(() => {
      this.setState((currState) => {
        const newState = {
          comments: currState.comments.filter(
            (comment) => comment.comment_id !== id
          ),
          isLoading: false,
          isToggleOn: true
        };
        return newState;
      });
    });
  };

  render() {
    const {
      comments,
      isToggleOn,
      hasError,
      errorMessage,
      isLoading
    } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className='ListComment'>
          {isToggleOn ? (
            <button className='ButtonPost' onClick={this.handleClick}>
              Post comment
            </button>
          ) : (
            <FormComment
              id={this.props.article_id}
              addComment={this.addComment}
            />
          )}
          <p className='CountP'>Post {comments.length} comments</p>
          {comments.map((comment) => {
            return (
              <CardComment
                key={comment.comment_id}
                comment={comment}
                loggedUser={this.props.loggedUser}
                deleteComment={this.deleteComment}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default ListComments;

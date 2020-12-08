import React from 'react';
import CardComment from './CardComment';
import FormComment from './FormComment';
import * as api from '../api';

class ListComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    isToggleOn: true
  };

  componentDidMount() {
    api.getAllCommentsByArticle(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
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

  render() {
    if (this.state.isLoading) {
      return (
        <div className='loadingDiv'>
          <p>Comments are being loaded</p>
        </div>
      );
    } else {
      return (
        <div className='ListComment'>
          {this.state.isToggleOn ? (
            <button onClick={this.handleClick}>Post comment</button>
          ) : (
            <FormComment
              id={this.props.article_id}
              addComment={this.addComment}
            />
          )}

          {this.state.comments.map((comment) => {
            return <CardComment key={comment.comment_id} comment={comment} />;
          })}
        </div>
      );
    }
  }
}

export default ListComments;

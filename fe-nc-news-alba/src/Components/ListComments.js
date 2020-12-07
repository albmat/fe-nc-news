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

  componentDidUpdate(prevProps, prevState) {
    const newComments =
      prevState.comments.length !== this.state.comments.length;
    if (newComments) {
      this.setState({
        comments: this.state.comments,
        isLoading: false,
        isToggleOn: false
      });
    }
  }

  handleClick = () => {
    this.setState((currState) => ({
      isToggleOn: !currState.isToggleOn
    }));
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
            <FormComment id={this.props.article_id} />
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

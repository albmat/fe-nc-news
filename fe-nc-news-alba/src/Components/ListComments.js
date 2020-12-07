import React from 'react';
import CardComment from './CardComment';
import { Link } from '@reach/router';
import * as api from '../api';

class ListComments extends React.Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    api.getAllCommentsByArticle(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

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
          <Link to={`/articles/${this.props.article_id}/comments`}>
            <button>Post comment</button>
          </Link>
          {this.state.comments.map((comment) => {
            return <CardComment key={comment.comment_id} comment={comment} />;
          })}
        </div>
      );
    }
  }
}

export default ListComments;

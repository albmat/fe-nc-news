import React from 'react';
import * as api from '../api';

class FormComment extends React.Component {
  state = {
    comment: {},
    username: '',
    body: ''
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    api.postCommentByArticle(this.props.id, this.state).then((newComment) => {
      this.props.addComment(newComment);
    });
  }

  render() {
    return (
      <div className='FormComment'>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type='text'
            id='username'
            name='username'
            value={this.state.username}
            placeholder='username'
            onChange={(event) => this.handleChange(event)}
          ></input>
          <input
            type='text'
            id='body'
            name='body'
            value={this.state.body}
            placeholder='your comment'
            onChange={(event) => this.handleChange(event)}
          ></input>
          <button type='submit'>Post</button>
        </form>
      </div>
    );
  }
}

export default FormComment;

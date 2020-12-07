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
    this.postComment().then(() => {
      this.setState({ username: '', body: '' });
      api.getAllCommentsByArticle(this.props.id);
    });
  }

  postComment() {
    return api
      .postCommentByArticle(this.props.id, this.state)
      .then((comment) => {
        this.setState({ comment });
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

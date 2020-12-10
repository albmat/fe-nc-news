import React from 'react';
import * as api from '../api';

class FormComment extends React.Component {
  state = {
    comment: {},
    username: 'jessjelly',
    body: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    api.postCommentByArticle(this.props.id, this.state).then((newComment) => {
      this.props.addComment(newComment);
    });
  };

  render() {
    return (
      <div className='FormCommentDiv'>
        <form className='FormComment' onSubmit={this.handleSubmit}>
          <textarea
            className='FormInput'
            type='text'
            id='body'
            name='body'
            value={this.state.body}
            placeholder='Enter your comment here...'
            required
            onChange={this.handleChange}
          ></textarea>
          <button className='FormButton' type='submit'>
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default FormComment;

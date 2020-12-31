import React from 'react';
import * as api from '../api';
import { UserContext } from '../Context/User';
import ErrorMessage from './ErrorMessage';

class FormComment extends React.Component {
  state = {
    comment: {},
    body: '',
    hasError: false,
    errorMessage: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    api
      .postCommentByArticle(this.props.id, this.state, this.context.loggedUser)
      .then((newComment) => {
        this.props.addComment(newComment);
      })
      .catch(() => {
        this.setState({
          hasError: true,
          errorMessage: 'You need to be logged in to do that!!'
        });
      });
  };

  render() {
    const { body, hasError, errorMessage } = this.state;
    return (
      <div className='FormCommentDiv'>
        <form className='FormComment' onSubmit={this.handleSubmit}>
          <textarea
            className='FormTextArea'
            type='text'
            id='body'
            name='body'
            value={body}
            placeholder='Enter your comment here...'
            required
            onChange={this.handleChange}
          ></textarea>
          <button className='FormButton' type='submit'>
            Post
          </button>
        </form>
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }
}

FormComment.contextType = UserContext;

export default FormComment;

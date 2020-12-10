import React from 'react';
import * as api from '../api';
import { UserContext } from '../Context/User';
import ErrorMessage from './ErrorMessage';

class FormComment extends React.Component {
  state = {
    comment: {},
    username: this.context.loggedUser,
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
      .postCommentByArticle(this.props.id, this.state)
      .then((newComment) => {
        this.props.addComment(newComment);
      })
      .catch(() => {
        this.setState((currState) => {
          const newState = {
            ...currState,
            hasError: true,
            errorMessage: 'You need to be logged in to do that!!'
          };
          return newState;
        });
      });
  };

  render() {
    const { body, hasError, errorMessage } = this.state;
    return (
      <div className='FormCommentDiv'>
        <form className='FormComment' onSubmit={this.handleSubmit}>
          <textarea
            className='FormInput'
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
        {hasError ? <ErrorMessage errorMessage={errorMessage} /> : null}
      </div>
    );
  }
}

FormComment.contextType = UserContext;

export default FormComment;

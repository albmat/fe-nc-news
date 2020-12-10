import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../Context/User';

class FormArticle extends React.Component {
  state = {
    author: this.context.loggedUser,
    topic: '',
    title: '',
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
      .postArticle(this.state)
      .then((newArticle) => {
        this.props.addArticle(newArticle);
      })
      .catch(() => {
        this.setState((currState) => {
          const newState = {
            ...currState,
            isLoading: false,
            hasError: true,
            errorMessage: 'You need to be logged in to do that!!'
          };
          return newState;
        });
      });
  };

  render() {
    const { hasError, errorMessage, title, body } = this.state;
    return (
      <div className='FormArticleDiv'>
        <form className='FormArticle' onSubmit={this.handleSubmit}>
          <select
            required
            className='Select'
            id='topic'
            name='topic'
            onChange={this.handleChange}
          >
            <option value=''>Topics</option>
            <option value='coding'>Coding</option>
            <option value='football'>Football</option>
            <option value='cooking'>Cooking</option>
          </select>
          <input
            className='FormInput'
            type='text'
            id='title'
            name='title'
            value={title}
            required
            placeholder='Title'
            onChange={this.handleChange}
          />
          <textarea
            className='FormInput'
            type='text'
            id='body'
            name='body'
            value={body}
            required
            placeholder='Enter your article here...'
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

FormArticle.contextType = UserContext;

export default FormArticle;

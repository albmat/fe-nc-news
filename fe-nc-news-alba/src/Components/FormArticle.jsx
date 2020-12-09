import React from 'react';
import * as api from '../api';

class FormArticle extends React.Component {
  state = {
    username: 'jessjelly',
    topic: 'coding',
    title: '',
    body: ''
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    api.postArticle(this.state).then((newArticle) => {
      this.props.addArticle(newArticle);
    });
  }

  render() {
    return (
      <div className='FormArticleDiv'>
        <form className='FormArticle' onSubmit={this.handleSubmit}>
          <input
            className='FormInput'
            type='text'
            id='title'
            name='title'
            value={this.state.title}
            required
            placeholder='Title'
            onChange={this.handleChange}
          />
          <textarea
            className='FormInput'
            type='text'
            id='body'
            name='body'
            value={this.state.body}
            required
            placeholder='Enter your article here...'
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

export default FormArticle;

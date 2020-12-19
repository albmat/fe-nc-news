import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../Context/User';
import { navigate } from '@reach/router';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class FormArticle extends React.Component {
  state = {
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
    const { loggedUser } = this.context;

    api
      .postArticle(this.state, loggedUser)
      .then((newArticle) => {
        this.props.addArticle(newArticle);
        this.setState({ isCreated: true });
        navigate(`/articlesby/${loggedUser}`);
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: 'You need to be logged in to do that!!'
        });
      });
  };

  render() {
    const { hasError, errorMessage, title, body, topic } = this.state;
    return (
      <div className='FormArticleDiv'>
        <form className='FormArticle' onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel id='topic'>Topics</InputLabel>
            <Select
              className='Select'
              id='topic'
              value={topic}
              name='topic'
              onChange={this.handleChange}
              label='Topic'
              required
            >
              <MenuItem value=''>
                <em>Topics</em>
              </MenuItem>
              <MenuItem value={'coding'}>Coding</MenuItem>
              <MenuItem value={'football'}>Football</MenuItem>
              <MenuItem value={'cooking'}>Cooking</MenuItem>
            </Select>
          </FormControl>
          <input
            className='FormInput'
            type='text'
            id='title'
            name='title'
            value={title}
            required
            placeholder='Title...'
            onChange={this.handleChange}
          />
          <textarea
            className='FormTextArea'
            type='text'
            id='body'
            name='body'
            value={body}
            required
            placeholder='Enter your article here...'
            onChange={this.handleChange}
          ></textarea>
          <Button
            className='FormButton'
            type='submit'
            variant='outlined'
            size='small'
          >
            Post
          </Button>
        </form>
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }
}

FormArticle.contextType = UserContext;

export default FormArticle;

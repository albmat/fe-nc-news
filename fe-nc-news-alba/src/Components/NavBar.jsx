import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../Context/User';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class NavBar extends React.Component {
  state = {
    users: [],
    username: '',
    isToggleOn: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    api
      .getAllUsers()
      .then((users) => {
        this.setState((currState) => {
          const newState = { ...currState, users: users };
          return newState;
        });
      })
      .catch((err) => {
        const {
          response: { status, statusText }
        } = err;
        this.setState({
          isToggleOn: true,
          hasError: true,
          errorMessage: `Nah! Try again. ${status}!! ${statusText}`
        });
      });
  }

  handleClick = () => {
    this.setState((currState) => ({
      isToggleOn: !currState.isToggleOn,
      hasError: false
    }));
  };

  handleBlur = () => {
    this.setState((currState) => ({
      isToggleOn: !currState.isToggleOn,
      hasError: false
    }));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const userExists = this.state.users.filter((user) => {
      return user.username === this.state.username;
    });

    if (userExists.length !== 0) {
      this.props.logIn(this.state.username);
      this.setState({ isToggleOn: true, hasError: false, username: '' });
    } else {
      this.setState({
        hasError: true,
        errorMessage: 'There is no registered user with that name, try again!'
      });
    }
  };

  render() {
    const { hasError, errorMessage, isToggleOn, username } = this.state;
    const { logOut } = this.props;
    const { loggedUser } = this.context;

    return (
      <nav className='NavBar'>
        {loggedUser ? (
          <div className='FormLoginButton'>
            <Button onClick={logOut} size='small' endIcon={<Icon>send</Icon>}>
              LogOut
            </Button>
          </div>
        ) : isToggleOn ? (
          <div className='FormLoginButton'>
            <Button
              onClick={this.handleClick}
              size='small'
              endIcon={<Icon>send</Icon>}
            >
              LogIn
            </Button>
          </div>
        ) : (
          <div className='FormLoginDiv'>
            <form onSubmit={this.handleSubmit}>
              <TextField
                className='FormInputLogin'
                type='text'
                id='username'
                name='username'
                value={username}
                placeholder='username'
                required
                onChange={this.handleChange}
              />
              <Button
                size='small'
                endIcon={<Icon>send</Icon>}
                type='submit'
                onBlur={this.handleBlur}
              >
                Send
              </Button>
            </form>
          </div>
        )}
        {loggedUser && <ErrorMessage errorMessage={`Welcome ${loggedUser}`} />}
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </nav>
    );
  }
}

NavBar.contextType = UserContext;

export default NavBar;

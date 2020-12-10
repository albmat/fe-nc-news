import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';

class NavBar extends React.Component {
  state = {
    users: [],
    username: '',
    isToggleOn: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    api.getAllUsers().then((users) => {
      this.setState((currState) => {
        const newState = { ...currState, users: users };
        return newState;
      });
    });
  }

  handleClick = () => {
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
      this.setState({ isToggleOn: true, hasError: false });
    } else {
      this.setState({
        hasError: true,
        errorMessage: 'There is no registered user with that name, try again!'
      });
    }
  };

  render() {
    console.log(this.state.users);
    const { hasError, errorMessage, isToggleOn, username } = this.state;
    const { logOut, loggedUser } = this.props;

    return (
      <nav className='NavBar'>
        {loggedUser ? (
          <button className='NavBarButton' onClick={logOut}>
            LogOut
          </button>
        ) : isToggleOn ? (
          <button className='NavBarButton' onClick={this.handleClick}>
            LogIn
          </button>
        ) : (
          <div className='FormLoginDiv'>
            <form className='FormLogin' onSubmit={this.handleSubmit}>
              <input
                className='FormInputLogin'
                type='text'
                id='username'
                name='username'
                value={username}
                placeholder='username'
                required
                onChange={this.handleChange}
              ></input>
              <button className='FormButton' type='submit'>
                send
              </button>
            </form>
          </div>
        )}
        <p className={loggedUser ? null : 'hideWelcome'}>
          Welcome {loggedUser}
        </p>
        {hasError ? <ErrorMessage errorMessage={errorMessage} /> : null}
      </nav>
    );
  }
}

export default NavBar;

import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import { UserContext } from '../Context/User';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2, 'auto'),
      width: '25px'
    }
  }
}));

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
    const { logOut, classes } = this.props;
    const { loggedUser } = this.context;

    return (
      <nav className='NavBar'>
        {loggedUser ? (
          <Button
            onClick={logOut}
            size='small'
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            LogOut
          </Button>
        ) : isToggleOn ? (
          <Button
            onClick={this.handleClick}
            size='small'
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            LogIn
          </Button>
        ) : (
          <div className='FormLoginDiv'>
            <form
              className={classes.root}
              onSubmit={this.handleSubmit}
              onBlur={this.handleBlur}
            >
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
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                type='submit'
              >
                Send
              </Button>
            </form>
          </div>
        )}
        <p className={!loggedUser && 'hideWelcome'}>Welcome {loggedUser}</p>
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </nav>
    );
  }
}

NavBar.contextType = UserContext;

export default withStyles(styles, { withTheme: true })(NavBar);

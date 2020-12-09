import React from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';

class Voter extends React.Component {
  state = {
    hasVoted: false,
    vote_change: 0,
    hasError: false,
    errorMessage: ''
  };

  handleClick = () => {
    api.patchVotes(this.props.place, this.props.id).catch((err) => {
      const {
        response: { status, statusText }
      } = err;
      this.setState({
        hasError: true,
        errorMessage: `Article nof found... ${status}!! ${statusText}`,
        hasVoted: false,
        vote_change: 0
      });
    });
    this.setState({ vote_change: 1, hasVoted: true });
  };

  render() {
    if (this.hasError) {
      <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <>
          <p>{this.props.votes + this.state.vote_change} votes</p>
          <button onClick={this.handleClick} disabled={this.state.hasVoted}>
            Vote!
          </button>
        </>
      );
    }
  }
}

export default Voter;

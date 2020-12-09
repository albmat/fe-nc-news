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

  handleClick = (vote) => {
    api.patchVotes(this.props.place, this.props.id, vote).catch((err) => {
      const {
        response: { status, statusText }
      } = err;
      this.setState({
        hasError: true,
        errorMessage: `Impossible... ${status}!! ${statusText}`,
        hasVoted: false,
        vote_change: 0
      });
    });
    this.setState({ vote_change: vote, hasVoted: true });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <>
          <p>{this.props.votes + this.state.vote_change} votes</p>
          <button
            onClick={() => this.handleClick(1)}
            disabled={this.state.hasVoted}
          >
            VoteUp!
          </button>
          <button
            onClick={() => this.handleClick(-1)}
            disabled={this.state.hasVoted}
          >
            VoteDown!
          </button>
        </>
      );
    }
  }
}

export default Voter;

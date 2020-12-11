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
    const { hasError, errorMessage, vote_change, hasVoted } = this.state;
    const { votes } = this.props;

    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <>
          <p>{votes + vote_change} votes</p>
          <button onClick={() => this.handleClick(1)} disabled={hasVoted}>
            VoteUp!
          </button>
          <button onClick={() => this.handleClick(-1)} disabled={hasVoted}>
            VoteDown!
          </button>
        </>
      );
    }
  }
}

export default Voter;

import React from 'react';
import * as api from '../api';

class ListComments extends React.Component {
  state = {
    comments: [],
    isLoading: true
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className='loadingDiv'>
          <p>Comments are being loaded</p>
        </div>
      );
    } else {
      return <div className='ListComment'>Hello</div>;
    }
  }
}

export default ListComments;

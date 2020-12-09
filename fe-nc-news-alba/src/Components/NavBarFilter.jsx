import React from 'react';
import * as api from '../api';

class NavBarFilter extends React.Component {
  state = { users: [] };

  componentDidMount() {
    api.getAllUsers().then((users) => {
      this.setState({ users });
    });
  }

  render() {
    return (
      <nav className='NavBarFilter'>
        <select id='sort_by'>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comments</option>
          <option value='votes'>Votes</option>
        </select>
      </nav>
    );
  }
}

export default NavBarFilter;

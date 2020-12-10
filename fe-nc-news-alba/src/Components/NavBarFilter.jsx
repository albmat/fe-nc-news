import React from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/all';

class NavBarFilter extends React.Component {
  state = {
    topic: this.props.topic,
    author: this.props.author,
    sort_by: 'created_at',
    order: 'asc'
  };

  componentDidUpdate(prevProps, prevState) {
    const newFilter = prevState.sort_by !== this.state.sort_by;
    if (newFilter) {
      this.props.getArticles(this.state);
    }

    const newOrder = prevState.order !== this.state.order;
    if (newOrder) {
      this.props.getArticles(this.state);
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeOrder = () => {
    this.setState((currState) => {
      if (currState.order === 'asc') return { ...currState, order: 'desc' };
      else return { ...currState, order: 'asc' };
    });
  };

  render() {
    return (
      <nav className='NavBarFilter'>
        <select
          className='Select'
          id='sort_by'
          name='sort_by'
          onChange={this.changeHandler}
        >
          <option value='created_at'>Sort by</option>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comments</option>
          <option value='votes'>Votes</option>
        </select>
        <button onClick={this.changeOrder}>
          {this.state.order === 'asc' ? (
            <IoMdArrowDropdown size={10} />
          ) : (
            <IoMdArrowDropup size={10} />
          )}
        </button>
      </nav>
    );
  }
}

export default NavBarFilter;

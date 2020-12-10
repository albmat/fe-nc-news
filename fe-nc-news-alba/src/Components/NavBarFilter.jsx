import React from 'react';

class NavBarFilter extends React.Component {
  state = {
    topic: this.props.topic,
    author: this.props.author,
    sort_by: 'created_at'
  };

  // componentDidMount() {
  //   // this.props.getArticles(this.state);
  // }

  componentDidUpdate(prevProps, prevState) {
    const newFilter = prevState.sort_by !== this.state.sort_by;
    if (newFilter) {
      this.props.getArticles(this.state);
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
      </nav>
    );
  }
}

export default NavBarFilter;

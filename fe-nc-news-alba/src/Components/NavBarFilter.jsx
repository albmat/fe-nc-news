import React from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/all';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class NavBarFilter extends React.Component {
  state = {
    sort_by: 'created_at',
    order: 'desc'
  };

  componentDidUpdate(prevProps, prevState) {
    const newFilter = prevState.sort_by !== this.state.sort_by;
    if (newFilter) {
      this.props.getArticles({
        ...this.state,
        topic: this.props.topic,
        author: this.props.author
      });
    }

    const newOrder = prevState.order !== this.state.order;
    if (newOrder) {
      this.props.getArticles({
        ...this.state,
        topic: this.props.topic,
        author: this.props.author
      });
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
    const { order, sort_by } = this.state;

    return (
      <nav className='NavBarFilter'>
        <FormControl>
          <InputLabel id='sort_by' error>
            Sort by
          </InputLabel>
          <Select
            className='Select'
            id='sort_by'
            value={sort_by}
            onChange={this.changeHandler}
            name='sort_by'
          >
            <MenuItem value={'created_at'}>Date</MenuItem>
            <MenuItem value={'comment_count'}>Comments</MenuItem>
            <MenuItem value={'votes'}>Votes</MenuItem>
          </Select>
          <Button
            onClick={this.changeOrder}
            size='small'
            endIcon={
              order === 'asc' ? (
                <IoMdArrowDropup size={18} />
              ) : (
                <IoMdArrowDropdown size={18} />
              )
            }
          ></Button>
        </FormControl>
      </nav>
    );
  }
}

export default NavBarFilter;

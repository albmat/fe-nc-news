import React from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Topics extends React.Component {
  state = {
    topics: []
  };

  componentDidMount() {
    api.getAllTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    return (
      <div className='Topics'>
        {this.state.topics.map((topic) => {
          return (
            <Link key={topic.slug} className='Link' to={`/${topic.slug}`}>
              {topic.slug}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Topics;

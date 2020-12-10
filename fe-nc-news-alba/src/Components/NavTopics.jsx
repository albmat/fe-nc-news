import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function NavTopics() {
  const [topics, setTopics] = React.useState([]);
  const [value, setValue] = React.useState(2);

  useEffect(() => {
    api.getAllTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
      >
        {topics.map((topic) => {
          return (
            <Tab
              label={
                <Link
                  key={topic.slug}
                  className='Link'
                  to={`/articles/${topic.slug}`}
                >
                  {topic.slug}
                </Link>
              }
            />
          );
        })}
      </Tabs>
    </Paper>
  );
}

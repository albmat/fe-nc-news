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
        indicatorColor='secondary'
        textColor='secondary'
        onChange={handleChange}
      >
        {topics.map((topic) => {
          return (
            <Tab
              key={topic.slug}
              label={topic.slug}
              to={`/articles/${topic.slug}`}
              component={Link}
            />
          );
        })}
      </Tabs>
    </Paper>
  );
}

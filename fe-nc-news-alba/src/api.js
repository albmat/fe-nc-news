import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-alba-news-app.herokuapp.com/api'
});

export const getAllTopics = () => {
  return newsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getAllArticles = (topic) => {
  console.log(topic, 'topic');
  return newsApi
    .get('/articles', { params: { topic: topic } })
    .then(({ data }) => {
      console.log(data);
      return data.articles;
    });
};

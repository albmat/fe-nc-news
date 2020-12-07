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
  return newsApi.get('/articles', { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
};

export const patchArticleVotes = (id, inc_votes) => {
  return newsApi.patch(`/articles/${id}`, { inc_votes }).then(({ data }) => {
    return data.article;
  });
};

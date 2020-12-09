import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://nc-alba-news-app.herokuapp.com/api'
});

export const getAllTopics = () => {
  return newsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getAllArticles = (params) => {
  console.log(params, 'params in api');
  return newsApi
    .get('/articles', { params: { ...params, limit: 100 } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
};

export const getAllCommentsByArticle = (id) => {
  return newsApi
    .get(`/articles/${id}/comments`, { params: { limit: 100 } })
    .then(({ data }) => {
      return data.comments;
    });
};

export const postCommentByArticle = (id, { username, body }) => {
  return newsApi
    .post(`/articles/${id}/comments`, {
      username,
      body
    })
    .then(({ data }) => {
      return data.comment;
    })
    .catch((err) => console.log(err, 'error'));
};

export const patchVotes = (place, id) => {
  return newsApi.patch(`/${place}/${id}`, { inc_votes: 1 });
};

export const deleteComment = (id) => {
  return newsApi.delete(`/comments/${id}`);
};

export const getAllUsers = () => {
  return newsApi.get('/users').then(({ data }) => {
    return data.users;
  });
};

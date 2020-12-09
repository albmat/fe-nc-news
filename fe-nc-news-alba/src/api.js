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
  return newsApi
    .get('/articles', { params: { topic, limit: 100 } })
    .then(({ data }) => {
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

export const patchCommentVotes = (id, inc_votes) => {
  return newsApi.patch(`/comments/${id}`, { inc_votes }).then(({ data }) => {
    return data.comment;
  });
};

export const deleteComment = (id) => {
  return newsApi.delete(`/comments/${id}`);
};

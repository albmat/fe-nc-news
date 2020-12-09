import './App.css';
import Header from './Components/Header';
import NavTopics from './Components/NavTopics';
import ListArticles from './Components/ListArticles';
import ArticleInfo from './Components/ArticleInfo';
import ListComments from './Components/ListComments';
import NavBar from './Components/NavBar';
import ErrorMessage from './Components/ErrorMessage';
import { Router } from '@reach/router';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Header />
      <NavTopics />
      <Router primary={false}>
        <ListComments path='/articles/:article_id/comments' />
        <ListArticles path='/articles' />
        <ListArticles path='user/:username' />
        <ListArticles path='/:topic_slug' />
        <ArticleInfo path='/articles/:article_id' />
        <ErrorMessage default errorMessage='Page not found' />
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Header from './Components/Header';
import NavTopics from './Components/NavTopics';
import ListArticles from './Components/ListArticles';
import ArticleInfo from './Components/ArticleInfo';
import ListComments from './Components/ListComments';
import { Router } from '@reach/router';

function App() {
  return (
    <div className='App'>
      <Header />
      <NavTopics />
      <Router>
        <ListComments path='/articles/:article_id/comments' />
        <ListArticles path='/articles' />
        <ListArticles path='/:topic_slug' />
        <ArticleInfo path='/articles/:article_id' />
      </Router>
    </div>
  );
}

export default App;

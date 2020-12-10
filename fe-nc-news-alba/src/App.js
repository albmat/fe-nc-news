import './App.css';
import Header from './Components/Header';
import NavTopics from './Components/NavTopics';
import ListArticles from './Components/ListArticles';
import ArticleInfo from './Components/ArticleInfo';
import ListComments from './Components/ListComments';
import NavBar from './Components/NavBar';
import ErrorMessage from './Components/ErrorMessage';
import { Router } from '@reach/router';
import React from 'react';

class App extends React.Component {
  state = {
    loggedUser: null
  };

  logIn = (username) => {
    this.setState({ loggedUser: username });
  };

  logOut = () => {
    this.setState({ loggedUser: null });
  };

  render() {
    return (
      <div className='App'>
        <NavBar
          logIn={this.logIn}
          logOut={this.logOut}
          loggedUser={this.state.loggedUser}
        />
        <Header />
        <NavTopics />
        <Router primary={false}>
          <ListArticles path='/articles' />
          <ListArticles path='/articlesby/:username' />
          <ListArticles path='/articles/:topic_slug' />
          <ArticleInfo
            path='/article/:article_id'
            loggedUser={this.state.loggedUser}
          />
          <ListComments
            path='/article/:article_id/comments'
            loggedUser={this.state.loggedUser}
          />
          <ErrorMessage default errorMessage='Page not found' />
        </Router>
      </div>
    );
  }
}

export default App;

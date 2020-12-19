import './App.css';
import Header from './Components/Header';
import NavTopics from './Components/NavTopics';
import ListArticles from './Components/ListArticles';
import ArticleInfo from './Components/ArticleInfo';
import NavBar from './Components/NavBar';
import ErrorMessage from './Components/ErrorMessage';
import Home from './Components/Home';
import { UserContext } from './Context/User';
import { Router } from '@reach/router';
import React from 'react';

class App extends React.Component {
  state = {
    loggedUser: ''
  };

  logIn = (username) => {
    this.setState({ loggedUser: username });
  };

  logOut = () => {
    this.setState({ loggedUser: '' });
  };

  render() {
    const { loggedUser } = this.state;

    return (
      <UserContext.Provider value={{ loggedUser: loggedUser }}>
        <div className='App'>
          <NavBar logIn={this.logIn} logOut={this.logOut} />
          <Header />
          <NavTopics />
          <Router primary={false}>
            <Home path='/' />
            <ListArticles path='/articles' />
            <ListArticles path='/articlesby/:username' />
            <ListArticles path='/articles/:topic_slug' />
            <ArticleInfo path='/article/:article_id/*' />
            <ErrorMessage default errorMessage='Page not found' />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import NavBar from './components/navbar';
import Home from './containers/home';
import Video from './containers/video';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Route path='/' exact component={Home} />
        <Route path='/video/:id' exact component={Video} />
      </>
    );
  }
}

export default App;

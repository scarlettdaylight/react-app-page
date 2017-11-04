import React, { Component } from 'react';
//import components
import SearchBar from './component/SearchBar';
import AppListing from './component/AppListing';
import AppTopGrossingList from './component/AppTopGrossingList';
//import css
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './css/layout.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <AppTopGrossingList />
          <AppListing />
        </div>
      </div>
    );
  }
}

export default App;

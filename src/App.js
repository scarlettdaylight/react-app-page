import React, { Component } from 'react';
//import css
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './css/layout.css';
//import components
import FilterableAppList from './component/FilterableAppList';

class App extends Component {
  render() {
    return <FilterableAppList />;
  }
}

export default App;

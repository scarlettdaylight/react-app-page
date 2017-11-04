import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    return (
      <form>
        <div className="input-field">
          <input id="search" type="search" required />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </form>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="teal nav-wrapper white-text">
            <SearchInput />
          </div>
        </nav>
      </div>
    );
  }
}

export default SearchBar;

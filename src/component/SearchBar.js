import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    console.log(e);
    this.props.onSearchTextChange(e.target.value);
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="teal nav-wrapper white-text">
            <form>
              <div className="input-field">
                <input
                  id="search"
                  type="search"
                  onChange={this.handleSearchTextChange}
                  value={this.props.searchText}
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default SearchBar;

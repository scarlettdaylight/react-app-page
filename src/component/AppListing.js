import React, { Component } from 'react';
import 'whatwg-fetch';

class AppRow extends Component {
  render() {
    const app = this.props.app;
    //get the necessary info
    const appicon = app['im:image']['0'].label;
    const appname = app['im:name'].label;
    const apptype = app.category.attributes.label;
    return (
      <li className="collection-item avatar">
        <img src={appicon} alt={appname} className="circle" />
        <span className="title">{appname}</span>
        <p>{apptype}</p>
        <a href="#" className="secondary-content">
          <i className="material-icons">grade</i>
        </a>
      </li>
    );
  }
}

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: []
    };
  }

  componentDidMount() {
    fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('parsed json', json);
        this.setState({ appList: json.feed.entry });
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  render() {
    const rows = [];
    this.state.appList.forEach(app => {
      rows.push(<AppRow app={app} key={app.id.attributes['im:id']} />);
    });
    //return the face of app list
    return (
      <div className="row">
        <div className="col s12">
          <ul className="collection">{rows}</ul>
        </div>
      </div>
    );
  }
}

export default AppList;

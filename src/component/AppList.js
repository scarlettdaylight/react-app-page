import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import preloader from '../images/preloader.gif';

function LazyLoadHolder() {
  return (
    <li className="collection-item">
      <div className="preloader-wrapper">
        <img src={preloader} alt={'preloader'} />
      </div>
    </li>
  );
}

class AppRow extends Component {
  render() {
    const app = this.props.app;
    //get the necessary info
    const appicon = app['im:image']['0'].label;
    const appname = app['im:name'].label;
    const apptype = app.category.attributes.label;
    return (
      <LazyLoad
        once
        height={50}
        offset={[-50, 0]}
        placeholder={<LazyLoadHolder />}
      >
        <li className="collection-item avatar">
          <img src={appicon} alt={appname} className="circle" />
          <span className="title">{appname}</span>
          <p>{apptype}</p>
          <a href="#" className="secondary-content">
            <i className="material-icons">grade</i>
          </a>
        </li>
      </LazyLoad>
    );
  }
}

class AppList extends Component {
  render() {
    const rows = [];
    this.props.appList.forEach(app => {
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

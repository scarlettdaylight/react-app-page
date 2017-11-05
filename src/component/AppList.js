import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad, { forceCheck } from 'react-lazyload';
import preloader from '../images/preloader.gif';
import swal from 'sweetalert';
import ModelContent from './ModelContent';

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
  constructor(props) {
    super(props);
    this.openAppModal = this.openAppModal.bind(this);
  }

  static isEven(n) {
    return n % 2 === 0;
  }

  openAppModal() {
    let wrapper = document.createElement('div');
    ReactDOM.render(<ModelContent app={this.props.app} />, wrapper);
    let el = wrapper.firstChild;
    swal({
      content: el,
      buttons: ['Back', 'Install']
    }).then(install => {
      if (install) {
        window.open(this.props.app.id.label, '_blank');
      }
    });
  }

  render() {
    const app = this.props.app;
    //get the necessary info
    const app_icon = app['im:image']['1'].label;
    const app_name = app['im:name'].label;
    const app_type = app.category.attributes.label;
    const app_num = this.props.app_num;
    return (
      <LazyLoad
        once
        height={50}
        offset={[-50, 0]}
        debounce={500}
        placeholder={<LazyLoadHolder />}
      >
        <li className="collection-item" onClick={this.openAppModal}>
          <div className="row">
            <div className="col s1 app-number">{app_num}</div>
            <div className="col s3 m2 app-image-wrapper">
              <img
                src={app_icon}
                alt={app_name}
                className={
                  AppRow.isEven(app_num)
                    ? 'responsive-img circle'
                    : 'responsive-img normal'
                }
              />
            </div>
            <div className="col s8 m8">
              <span className="app-name">{app_name}</span>
              <span className="app-type">{app_type}</span>
            </div>
          </div>
        </li>
      </LazyLoad>
    );
  }
}

class AppList extends Component {
  componentDidUpdate() {
    forceCheck();
  }

  render() {
    const rows = [];
    const searchText = this.props.searchText.toLowerCase();
    let counter = 0;
    this.props.appList.forEach(app => {
      //filter out not match item
      const name = app['im:name'].label.toLowerCase();
      const type = app['im:contentType'].attributes.term.toLowerCase();
      const author = app['im:artist'].label.toLowerCase();
      const summary = app.summary.label.toLowerCase();

      if (
        name.indexOf(searchText) === -1 &&
        type.indexOf(searchText) === -1 &&
        author.indexOf(searchText) === -1 &&
        summary.indexOf(searchText) === -1
      ) {
        return;
      }
      counter++;
      rows.push(
        <AppRow app={app} key={app.id.attributes['im:id']} app_num={counter} />
      );
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

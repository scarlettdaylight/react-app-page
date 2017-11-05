import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import 'whatwg-fetch';
import ModelContent from './ModelContent';
import { Swiper, Pagination, Navigation, Autoplay } from '../js/swiper.esm';

Swiper.use([Pagination, Navigation, Autoplay]);

class EmptyItem extends Component {
  render() {
    return (
      <div className="swiper-slide">
        <div className="no-item">{this.props.words}</div>
      </div>
    );
  }
}

//top grossing list is using swiper to enable horizontal scroll and swipe
class AppItem extends Component {
  constructor(props) {
    super(props);
    this.openAppModal = this.openAppModal.bind(this);
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
    const appicon = app['im:image']['1'].label;
    const appname = app['im:name'].label;
    const apptype = app.category.attributes.label;
    return (
      <div className="swiper-slide app-item">
        <div className="row">
          <div className="col s12 ">
            <div className="card-panel hoverable" onClick={this.openAppModal}>
              <div className="valign-wrapper">
                <div className="card-app-img">
                  <img
                    src={appicon}
                    alt={appname}
                    className="normal responsive-img"
                  />
                </div>
                <div className="card-app-detail">
                  <span className="card-app-name app-name">{appname}</span>
                  <span className="card-app-type app-type">{apptype}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AppTopGrossingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiper: null
    };
  }

  componentDidMount() {
    let s = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      mousewheel: true,
      slidesPerView: 3,
      roundLengths: true,
      spaceBetween: 10,
      // autoplay: {
      //     delay: 5000,
      // },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        // when window width is <= 320px
        480: {
          slidesPerView: 1
        },
        992: {
          slidesPerView: 2
        }
      }
    });
    this.setState({ swiper: s });
  }

  componentDidUpdate() {
    this.state.swiper.update();
  }

  render() {
    const items = [];
    const searchText = this.props.searchText.toLowerCase();
    this.props.grossingList.forEach(app => {
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
      items.push(<AppItem app={app} key={app.id.attributes['im:id']} />);
    });

    if (items.length === 0) {
      items.push(<EmptyItem key={1} words={'ops!'} />);
      items.push(<EmptyItem key={2} words={'Nothing to show.'} />);
    }

    //swiper structure here
    return (
      <div className="row">
        <div className="col s12">
          <h4 className="app-grossing-title">Top Grossing</h4>
        </div>
        <div className="col s12">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {items.length === 0 ? 'Nothing' : items}
            </div>
            <div className="swiper-button-prev">
              <i className="material-icons medium">chevron_left</i>
            </div>
            <div className="swiper-button-next">
              <i className="material-icons medium">chevron_right</i>
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    );
  }
}

export default AppTopGrossingList;

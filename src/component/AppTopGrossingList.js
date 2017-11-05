import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  Swiper,
  Pagination,
  Navigation,
  Autoplay
} from 'swiper/dist/js/swiper.esm';

Swiper.use([Pagination, Navigation, Autoplay]);

//top grossing list is using swiper to enable horizontal scroll and swipe
class AppItem extends Component {
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
            <div className="card-panel hoverable">
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
      },
      on: {
        init: function() {
          console.log('hihihi');
          console.log(this);
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
    console.log(this.props.grossingList);
    this.props.grossingList.forEach(app => {
      items.push(<AppItem app={app} key={app.id.attributes['im:id']} />);
    });
    //swiper structure here
    return (
      <div className="row">
        <div className="col s12">
          <h4 className="app-grossing-title">Top Grossing</h4>
        </div>
        <div className="col s12">
          <div className="swiper-container">
            <div className="swiper-wrapper">{items}</div>
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

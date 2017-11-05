import React, { Component } from 'react';
import 'whatwg-fetch';
import 'swiper/dist/css/swiper.min.css';
import { Swiper, Pagination, Navigation } from 'swiper/dist/js/swiper.esm';

Swiper.use([Pagination]);
Swiper.use([Navigation]);

//top grossing list is using swiper to enable horizontal scroll and swipe
class AppItem extends Component {
  render() {
    const app = this.props.app;
    //get the necessary info
    const appicon = app['im:image']['0'].label;
    const appname = app['im:name'].label;
    const apptype = app.category.attributes.label;
    return (
      <div className="swiper-slide app-item">
        <div className="col s12">
          <div className="card hoverable">
            <div className="card-content">
              <span className="card-title">
                <img
                  src={appicon}
                  alt={appname}
                  className="circle responsive-img"
                />
                {appname}
              </span>
              <p>{apptype}</p>
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
      slidesPerView: 4,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      },
      breakpoints: {
        // when window width is <= 320px
        480: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 10
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
          <div className="swiper-container">
            <div className="swiper-wrapper">{items}</div>
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    );
  }
}

export default AppTopGrossingList;

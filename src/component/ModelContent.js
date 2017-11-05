import React, { Component } from 'react';

class ModelContent extends Component {
  render() {
    const app = {
      icon: this.props.app['im:image']['1'].label,
      name: this.props.app['im:name'].label,
      type: this.props.app.category.attributes.label,
      summary: this.props.app.summary.label,
      copyright: this.props.app.rights.label
    };
    return (
      <div className="modal-wrapper">
        <div className="app-image-wrapper">
          <img alt={app.name} src={app.icon} />
        </div>
        <div className="app-title teal-text">
          <h5>{app.name}</h5>
        </div>
        <div className="app-type">{app.type}</div>
        <hr />
        <div className="app-summary">
          <p>{app.summary}</p>
        </div>
      </div>
    );
  }
}

export default ModelContent;

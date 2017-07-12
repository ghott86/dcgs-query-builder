import React from 'react';
import AvatarEditor from 'react-avatar-editor';

export default React.createClass({
  getInitialState: function() {
    return {
      scale: 1,
      borderRadius: 100,
      preview: null
    };
  },

  componentDidMount: function() {},

  handleSave: function(data) {
    var img = this.refs.avatar.getImage();
    var rect = this.refs.avatar.getCroppingRect();
    this.setState({preview: img, croppingRect: rect});
  },

  handleScale: function() {
    var scale = parseFloat(this.refs.scale.value);
    this.setState({scale: scale})
  },

  logCallback: function(e) {
    console.log("callback", e);
  },

  render: function() {
    return <div>
      <AvatarEditor
        ref="avatar"
        scale={this.state.scale}
        borderRadius={this.state.borderRadius}
        onSave={this.handleSave}
        onLoadFailed={this.logCallback.bind(this, 'onLoadFailed')}
        onUpload={this.logCallback.bind(this, 'onUpload')}
        onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
        image="/src/images/sampleHeadshot.jpg"/>
      <br />
      <div style={{width: '230px', 'margin': 'auto'}}>
        Zoom: <input name="scale" type="range" ref="scale" onChange={this.handleScale} min="1" max="2" step="0.01" defaultValue="1" />
        <br />
      </div>
    </div>
  }
});
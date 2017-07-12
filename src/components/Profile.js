import React from 'react';
import TagsInput from 'react-tagsinput';
import { Alert } from 'react-bootstrap';

import ProfileStore from '../stores/ProfileStore.js';
import ProfileImage from './util/ProfileImage.js';

export default React.createClass({

  //getInitialState
  getInitialState() {
    return {
      tags: [],
      fetchingProfile: false,
      profile: {},
      alertVisible: false,
      savingProfile: false,
      showError: false
    }
  },

  //componentDidMount
  componentDidMount() {
    this.setState({
      fetchingProfile: true
    });
    ProfileStore.getProfile().then(function(result) {
      this.setState({
        profile: result,
        tags: result.skills,
        fetchingProfile: false
      });
    }.bind(this), function(message) {
      this.setState({
        error: message,
        fetchingProfile: false
      });
    }.bind(this));
  },

  //handleTagsChange
  handleTagsChange(tags) {
    this.setState({tags});
  },

  //handleSaveChanges
  handleSaveChanges(event) {
    event.preventDefault();
    this.setState({savingProfile: true});

    var profile = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      workLocation: this.refs.workLocation.value,
      homeOffice: this.refs.homeOffice.value,
      skills: this.state.tags,
      timeZone: this.refs.timeZone.value
    };

    ProfileStore.saveProfile(profile).then(function(result) {
      this.setState({
        savingProfile: false,
        alertVisible: true
      });

      // hide the notification after 4 seconds
      setTimeout(function(){
        this.setState({alertVisible: false});
      }.bind(this), 4000);
    }.bind(this), function(message) {
      this.setState({
        savingProfile: false,
        showError: true
      });
    }.bind(this));
  },

  //handleAlertDismiss
  handleAlertDismiss() {
    this.setState({
      alertVisible: false,
      showError: false
    });
  },

  //render
  render() {
    return (
      <div className='my-profile'>
        <div className="container">
          {this.state.fetchingProfile && (
            <div>
              <div className="spinner"></div>
            </div>
          )}
          {!this.state.fetchingProfile && (

          <div className="row">
            <div className="col-md-4">
              <div className="text-center">
                <h1 style={{'marginTop': '0', 'marginBottom': '20px'}}>Edit Profile</h1>
                <ProfileImage/>
              </div>
            </div>
            <div className="col-md-8 personal-info">
              {this.state.alertVisible && (
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  Your profile has been <strong>updated</strong>.
                </Alert>
              )}

              {this.state.showError && (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                  There was an error saving your profile.
                </Alert>
              )}

                <form className="form-horizontal" role="form">

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Name:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="name" defaultValue={this.state.profile.name}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Email:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="email" defaultValue={this.state.profile.email}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Work Location:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="workLocation" defaultValue={this.state.profile.workLocation}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Home Office:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="homeOffice" defaultValue={this.state.profile.homeOffice}/>
                    </div>
                  </div>


                  <div className="form-group">
                    <label className="col-lg-3 control-label">Time Zone:</label>

                    <div className="col-lg-8">
                      <div className="ui-select">
                        <select id="user_time_zone" className="form-control" ref="timeZone">
                          <option value="Hawaii">(GMT-10:00) Hawaii</option>
                          <option value="Alaska">(GMT-09:00) Alaska</option>
                          <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp;
                            Canada)
                          </option>
                          <option value="Arizona">(GMT-07:00) Arizona</option>
                          <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time
                            (US &amp; Canada)
                          </option>
                          <option value="Central Time (US &amp; Canada)">(GMT-06:00)
                            Central Time (US &amp; Canada)
                          </option>
                          <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp;
                            Canada)
                          </option>
                          <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Skills:</label>
                    <div className="col-lg-8">
                      <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
                    </div>
                  </div>


                  <div className="form-group">
                    <div className="col-lg-12">
                    {this.state.savingProfile && (
                      <div>
                        <div className="spinner"></div>
                      </div>
                    )}
                    {!this.state.savingProfile && (
                        <input type="button" className="btn btn-primary pull-right" value="Save Changes" onClick={this.handleSaveChanges}/>
                    )}
                    </div>
                  </div>

              </form>

            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
});
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
      timeZone: this.refs.timeZone.value,
      //added
      docType: this.refs.docType.value,
      date: this.refs.date.value,
      classification: this.refs.classification.value,
      region: this.refs.region.value,
      organization: this.refs.organization.value
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
              <h1 style={{'marginTop': '0', 'marginBottom': '20px'}}>Add Query Fields</h1>
                
              <div className="form-group">
                <label className="col-lg-6 control-label">Query Fields:</label>
                <div className="col-lg-12">
                  <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
                </div>
              </div>  
            </div>

                    
            <div className="col-md-8 personal-info">
              {this.state.alertVisible && (
                <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                  Query field <strong>added</strong>.
                </Alert>
              )}

            

              {this.state.showError && (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                  There was an error adding the query field.
                </Alert>
              )}

                <form className="form-horizontal" role="form">

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Document Type:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="docType" defaultValue={this.state.profile.docType}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Date:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="date" defaultValue={JSON.stringify(this.state)}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Classification:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="workLocation" defaultValue={this.state.profile.classification}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">Region:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" ref="homeOffice" defaultValue={this.state.profile.region}/>
                    </div>
                  </div>


                  <div className="form-group">
                    <label className="col-lg-3 control-label">Organization:</label>

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
                    <div className="col-lg-12">
                    {this.state.savingProfile && (
                      <div>
                        <div className="spinner"></div>
                      </div>
                    )}
                    {!this.state.savingProfile && (
                        <input type="button" className="btn btn-primary pull-right" value="Search" onClick={this.handleSaveChanges}/>
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
























/*
import React from 'react';
import { connect } from 'react-redux'
import AuthStore from '../stores/AuthStore.js';
import { setNewsfeedList, setFetchingNewsfeedFlag, setAddingPostFlag } from '../actions';

var NewsFeed = React.createClass({
  componentDidMount() {
    this.fetchNewsfeed();
  },
  fetchNewsfeed() {
    this.props.dispatch(setFetchingNewsfeedFlag(true));
    fetch(window.apiRootUrl + '/newsfeed', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthStore.getAuthToken()
      }
    }).then(function(response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('');
      }
    }).then(function(json) {
      this.props.dispatch(setNewsfeedList(json));
      this.props.dispatch(setFetchingNewsfeedFlag(false));
    }.bind(this)).catch(function(error) {
      // TODO: update redux store w/ the fail message!
    }.bind(this));
  },
  handleNewPost(event) {
    event.preventDefault();
    var newPost = this.refs.newPost.value;

    if (!newPost || newPost === '') {
      return;
    }

    this.props.dispatch(setAddingPostFlag(true));
    fetch(window.apiRootUrl + '/newsfeed', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthStore.getAuthToken()
      },
      body: JSON.stringify( { body: newPost } )
    }).then(function(response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('');
      }
    }).then(function(json) {
      this.props.dispatch(setAddingPostFlag(false));
      this.refs.newPost.value = "";  // clear the field
      this.fetchNewsfeed();
    }.bind(this)).catch(function(error) {
      // TODO: handle error
    }.bind(this));
  },
  render() {
    return (
      <div className='newsfeed'>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <form>
                  <div className="text-left">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/spiltmilkstudio/73.jpg" className="avatar img-circle" alt="avatar"/>
                    <span style={{ 'marginLeft': '10px' }}>Jonathan Smith</span>
                  </div>
                  <div className="text-left" style={{ 'marginTop': '10px' }}>
                    <textarea style={{ height: '100px', width: '100%'}} ref="newPost" placeholder="What's New?"/>
                  </div>
                  <div className="text-left">
                    {this.props.newsfeed.get('addingPost') && (
                      <div>
                        <div className="spinner"></div>
                      </div>
                    )}
                    {!this.props.newsfeed.get('addingPost') && (
                      <input type="button" className="btn btn-primary" value="Post" onClick={this.handleNewPost}/>
                    )}
                  </div>
                </form>
              </div>

              <div className="col-md-9 personal-info">

                <h3>News Feed</h3>

                {this.props.newsfeed.get('fetchingNewsfeedFlag') && (
                  <div>
                    <div className="spinner"></div>
                  </div>
                )}
                {!this.props.newsfeed.get('fetchingNewsfeedFlag') && (
                  this.props.newsfeed.get('list').map(function(entry, i) {
                    return (
                      <div className="nf-entry" key={i}>
                        <div className="nf-pic">
                          <img src={entry.pic} className="avatar" alt="avatar"/>
                        </div>
                        <div className="nf-inner">
                          <div className="nf-name"><a href="#">{entry.name}</a></div>
                          <div className="nf-body">
                            {entry.body}
                          </div>
                          <div className="nf-date">{entry.date}</div>
                        </div>
                      </div>
                    );
                  })
               )}
              </div>
            </div>
          </div>
      </div>
    )
  }
});

function mapStateToProps(store) {
  return {
    newsfeed: store.newsfeed
  }
}

export default connect(mapStateToProps)(NewsFeed)
*/
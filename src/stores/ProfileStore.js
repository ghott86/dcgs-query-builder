import AuthStore from './AuthStore.js';

//singleton
let instance = null;

//ProfileStore class
class ProfileStore {
  
  //constructor
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  //getProfile
  getProfile() {
    return new Promise(function(resolve, reject) {
      fetch(window.apiRootUrl + '/profile', {
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
        resolve(json);
      }).catch(function(error) {
        reject('get profile failed');
      });
    });
  }

  //saveProfile
  saveProfile(profile) {
    return new Promise(function(resolve, reject) {
      fetch(window.apiRootUrl + '/profile', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthStore.getAuthToken()
        },
        body: JSON.stringify( profile )
      }).then(function(response) {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('');
        }
      }).then(function(json) {
        resolve(json);
      }).catch(function(error) {
        reject('save profile failed');
      });
    });
  }
}
export default new ProfileStore();
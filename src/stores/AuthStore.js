//singleton
let instance = null;

//AuthStore class
class AuthStore {
  
  //constructor
  constructor() {
    if (!instance) {
      instance = this;

      // read state from session storage
      this.loggedIn = (sessionStorage.loggedIn) ? sessionStorage.loggedIn : false;
      this.authToken = (sessionStorage.authToken) ? sessionStorage.authToken : null;
    }
    return instance;
  }

  //login
  login(username, password) {
    return new Promise(function(resolve, reject) {
      fetch(window.apiRootUrl + '/authenticate', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then(function(response) {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('');
        }
      }).then(function(json) {
        instance.loggedIn = true;
        instance.authToken = json.token;
        sessionStorage.loggedIn = instance.loggedIn;
        sessionStorage.authToken = instance.authToken;
        resolve('login successful');
      }).catch(function(error) {
        reject('authentication failed');
      });
    });
  }

  //logout
  logout() {
    instance.loggedIn = false;
    instance.authToken = null;
    delete sessionStorage.loggedIn;
    delete sessionStorage.authToken;
  }

  //isLoggedIn
  isLoggedIn() {
    return instance.loggedIn;
  }

  //getAuthToken
  getAuthToken() {
    return instance.authToken;
  }
}
export default new AuthStore();
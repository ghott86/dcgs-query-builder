import Immutable from 'immutable'

var initialState = {
  'myprofile': {}
};

export default (state = Immutable.Map(initialState), action = '') => {
  switch(action.type) {
    case 'setMyProfile':
      return state.set('myprofile', action.profile);
    default:
      return state;
  }
}
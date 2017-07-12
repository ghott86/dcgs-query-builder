import Immutable from 'immutable'

var initialState = {
  list: [],
  fetchingQueryBuilderFlag: false,
  addingPostFlag: false
};

export default (state = Immutable.Map(initialState), action = '') => {
  switch(action.type) {
    case 'setQueryBuilderList':
      return state.set('list', action.list);
    case 'setFetchingQueryBuilderFlag':
      return state.set('fetchingQueryBuilderFlag', action.flag);
    case 'setAddingFieldFlag':
      return state.set('addingFieldFlag', action.flag);
    default:
      return state;
  }
}
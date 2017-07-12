import React from 'react';
import QueryBuilder from './QueryBuilder';
import Header from './Header';
import { Provider } from 'react-redux'
import store from '../store'

export default React.createClass({

  //returnSomething
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  },

  //render
  render() {
    return (
      <div>
        <Header/>
        <section className="main-container">
          <Provider store={store}>
            {this.props.children || <QueryBuilder/>}
          </Provider>,
        </section>
      </div>
    )
  }
});
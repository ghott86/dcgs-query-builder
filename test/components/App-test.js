import React from 'react/addons';
import { expect } from 'chai';
import App from '../../src/components/App';
import Header from '../../src/components/Header';

describe('App', () => {
  const {TestUtils} = React.addons;
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<App />);
  const app = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(app.type).to.equal('div');
  });

  it('should have a header component as the first child', () => {
    expect(app.props.children).to.contain(<Header/>);
  });

  //it('should have a version number that match the package.json version property', () => {
  //  let h1 = app.props.children[0].props.children;
  //  expect(h1).to.contain(<h1>Social Network App </h1>);
  //});

  it('should return something', () => {
    let returnSomething = App.prototype.returnSomething('hello!');
    expect(returnSomething).to.be.equal('hello!');
  });

});
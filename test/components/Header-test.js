import React from 'react/addons';
import { expect } from 'chai';
import Header from '../../src/components/Header';
import { Navbar } from 'react-bootstrap';

describe('Header', () => {
  const {TestUtils} = React.addons;
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Header />);
  const header = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(header.type).to.equal('div');
  });

});
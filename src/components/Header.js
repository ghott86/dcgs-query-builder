import React from 'react';
import { Link }  from 'react-router';
import { Glyphicon, Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import AuthStore from '../stores/AuthStore.js';

export default React.createClass({
  
  //handleLogout
  handleLogout(event) {
    event.preventDefault();
    AuthStore.logout();
    window.location = '#/login';
  },

  //render
  render() {
    return (
      <div className='header'>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="logo"></span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight eventKey={0}> {/* This is the eventKey referenced */}
              <NavItem eventKey={1} href="#/querybuilder"><Glyphicon glyph="search" /> Query Builder</NavItem>
              <NavItem eventKey={2} href="#/profile"><Glyphicon glyph="user" /> My Profile</NavItem>
              <NavDropdown eventKey={3} title="Settings" id="collapsible-navbar-dropdown">
                <MenuItem eventKey="1" href="#/profile"><Glyphicon glyph="cog" /> Edit Query Settings</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4" onSelect={this.handleLogout}>Log Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
});
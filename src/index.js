import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Golang from './components/Golang'
import Python from './components/Python'
import Javascript from './components/Javascript'

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Link, Route, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Root = () =>
    <Router>
        <div>
            <Navbar inverse className="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink exact to="/" className="navlink">NEWSAPP</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse >
                    <Nav>
                        <NavItem>
                            <NavLink to="/golang" activeClassName="active">Golang</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/javascript" activeClassName="active">Javascript</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/python" activeClassName="active">Python</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={App} />
            <Route exact path="/golang" component={Golang} />
            <Route exact path="/javascript" component={Javascript} />
            <Route exact path="/python" component={Python} />


        </div>
    </Router >
const About = () =>
    <div>
        <h1>This is About Page....</h1>
    </div>


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

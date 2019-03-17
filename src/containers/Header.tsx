import React, {Component} from 'react';
import {connect} from 'react-redux';

import {stateInterface} from '../store';

import Logo from '../components/Logo';

class Header extends Component<stateInterface> {
    render() {
        return (
            <header style={{backgroundColor: '#232323'}}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="/">
                        <Logo></Logo>
                    </a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    <h4>Главная</h4>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <h4>Диеты</h4>
                                </a>
                            </li>
                        </ul>
                        <h4 className="px-2">Alexey Ubaev</h4>
                        <a href="/">
                            <i className="fa fa-user-o text-white"
                               style={{fontSize: '2em'}}></i>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default connect((state: stateInterface): stateInterface => state)(Header);

import React, {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {stateInterface} from '../../store';
import './Header.scss';
import Logo from '../../svg/logo.svg';

class KtnHeader extends Component<stateInterface> {
    render(): ReactNode {
        return (
            <header>
                <div className="navbar navbar-light navbar-brand d-flex justify-content-between align-items-center">
                    <Link to="/">
                        <img src={Logo}
                             alt="kitchen app"
                             style={{width: '32px'}}/>
                    </Link>
                    <div className="collapse navbar-collapse navbar-expand show">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link"
                                   href="#">
                                    <h4>Главная</h4>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href="#">
                                    <h4>Диеты</h4>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="px-2">Alexey Ubaev</h4>
                        <a href="/">
                            <i className="fa fa-user-o text-white"
                               style={{fontSize: '2em'}}></i>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect((state: stateInterface): stateInterface => state)(KtnHeader);

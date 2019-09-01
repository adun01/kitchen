import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './Header.scss';
import Logo from '../../svg/logo.svg';

import {getUnsubscribe} from '../../utils';

import {KtnProfileModel} from '../../models/profile';

export const KtnHeader = () => {

    const [profile, setProfile] = useState();
    useEffect((): () => void => getUnsubscribe(KtnProfileModel.getOne$()
        .subscribe((profile: KtnProfileModel): void => setProfile(profile))), []);

    return (
        <header className="row">
            <div className="col-12">
                <div
                    className="navbar navbar-light navbar-brand d-flex justify-content-between align-items-center">
                    <Link to="/">
                        <img className="logo"
                             src={Logo}
                             alt="kitchen app"/>
                    </Link>
                    <div className="collapse navbar-collapse navbar-expand show">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    <h4>Главная</h4>
                                </Link>
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
                        {profile && (<h4 className="px-2">{profile.name}</h4>)}
                        <a href="/">
                            <i className="fa fa-user-o text-white"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
};

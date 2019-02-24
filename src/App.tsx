import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom'
import {stateInterface} from './store';

import logo from './logo.svg';
import './App.css';

class App extends Component<stateInterface> {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Link to={`/list/`}>
                        Go to list
                    </Link>
                </header>
            </div>
        );
    }
}

export default connect((state: stateInterface): stateInterface => state)(App);

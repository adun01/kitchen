import React, {Component} from 'react';

import Header from './components/containers/Header';
import MainSearch from './components/containers/Main-search';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                    <MainSearch></MainSearch>
                </div>
            </div>
        );
    }
}

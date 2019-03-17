import React, {Component} from 'react';

import Header from './containers/Header';
import MainSearch from './containers/Main-search';
import MainGallery from './containers/Main-gallery';
import FirstDisplay from './components/First-display';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <FirstDisplay></FirstDisplay>
                <div className="container-fluid" id="main-container">
                    <div className="row">
                        <div className="col-8">
                            <MainGallery></MainGallery>
                        </div>
                        <div className="col-4">
                            <div className="bg-light">
                                <MainSearch></MainSearch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

import Header from './containers/Header';
import MainSearch from './containers/Main-search';
import MainGallery from './containers/Main-gallery';
import FirstDisplay from './components/First-display';

class App extends Component<RouteComponentProps> {
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
                                <MainSearch history={this.props.history}></MainSearch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(App);

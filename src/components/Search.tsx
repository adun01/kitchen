import React, {Component, ReactNode} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

import MainSearch from '../containers/Main-search';
import MainGallery from '../containers/Main-gallery';
import FirstDisplay from './First-display';

/**
 * Main page
 */
class KtnSearch extends Component<RouteComponentProps> {
    render(): ReactNode {
        return (
            <div>
                <FirstDisplay></FirstDisplay>
                <div id="main-container"
                     className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <MainGallery></MainGallery>
                        </div>
                        <div className="col-4">
                            <div className="bg-light">
                                <MainSearch history={this.props.history}></MainSearch>
                                {/*<FavoritesList></FavoritesList>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(KtnSearch);

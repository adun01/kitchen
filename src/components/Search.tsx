import React, {Component, ReactNode} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

import {KtnMainSearch} from '../containers/Main-search';
import {KtnMainGallery} from '../containers/Main-gallery';
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
                            <KtnMainGallery></KtnMainGallery>
                        </div>
                        <div className="col-4">
                            <div className="bg-light">
                                <KtnMainSearch history={this.props.history}></KtnMainSearch>
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

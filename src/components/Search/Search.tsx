import React from 'react';

import {KtnMainSearch} from '../../containers/Main-search';
import {KtnMainGallery} from '../../containers/Main-gallery';
import './Searh.scss';

/**
 * Search and galery
 */
export const KtnSearchPage = () => {
    return (
        <div className="row">
            <div id="first-display"
                 className="position-relative d-flex align-items-center justify-content-center w-100">
                <h3 className="col-6 position-relative">
                    Как выбрать что покушать? &mdash;&nbsp;очень просто, введите название блюда и&nbsp;скорректируйте
                    содержимое по&nbsp;своему желанию.
                </h3>
            </div>
            <div id="main-container"
                 className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <KtnMainGallery></KtnMainGallery>
                    </div>
                    <div className="col-4">
                        <div className="bg-light">
                            <KtnMainSearch></KtnMainSearch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

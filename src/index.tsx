import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {KtnHeader} from './containers/Header/Header';
import {KtnSearchPage} from './components/Search/Search';
import {KtnRecipe} from "./containers/Recipe/Recipe";
import {KtnNotFound} from './components/Not-found';
import {KtnCommonStoreInstance} from './store';
import './sass/main.scss';

ReactDOM.render(
    <Provider store={KtnCommonStoreInstance}>
        <BrowserRouter>
            <div className="container-fluid">
                <KtnHeader></KtnHeader>
                <Switch>
                    <Route exact path='/' component={KtnSearchPage}/>
                    <Route path='/recipe/:name' component={KtnRecipe}/>
                    <Route path='*' component={KtnNotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom'

import HocForRecipe from './containers/hoc/HocForRecipe';

import {KtnHeader} from './containers/Header/Header';
import Search from './components/Search';
import KtnNotFound from './components/Not-found';
import {store} from './store';
import './sass/main.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <KtnHeader></KtnHeader>
            <Switch>
                <Route exact path='/' component={Search}/>
                <Route path='/recipe/:name' component={HocForRecipe}/>
                <Route path='*' component={KtnNotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

import {call, put, takeLatest} from 'redux-saga/effects';

import {ONE_GET} from './types';
import {SuccessOne} from './actions';
import {KtnProfileModel} from "../../models/profile";

function currentLoad() {
    return fetch('/api/auth')
        .then(response => response.json());
}

function* getCurrent() {
    const profile = yield call(currentLoad);
    yield put(SuccessOne(new KtnProfileModel(profile)));
}

export function* profilesSaga() {
    yield takeLatest(ONE_GET, getCurrent);
}

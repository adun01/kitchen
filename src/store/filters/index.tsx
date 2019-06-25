import {KtnFiltersModel} from '../../models/filters';

import {parse} from 'query-string';

export class KtnFiltersStore extends KtnFiltersModel {
    constructor() {
        super(parse(window.location.search));
    }
}

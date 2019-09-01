import {KtnProfileModel} from '../../models/profile';

export class KtnProfileStore {
    public data: KtnProfileModel;

    constructor(data: KtnProfileModel = new KtnProfileModel({id: 0, name: '', surName: ''})) {
        this.data = data;
    }
}

import {ONE_GET, ONE_SUCCESS} from './types';
import {KtnProfileModel} from "../../models/profile";

export function GetOne() {
    return {
        type: ONE_GET
    }
}

export function SuccessOne(profile: KtnProfileModel) {
    return {
        type: ONE_SUCCESS,
        payload: profile
    }
}

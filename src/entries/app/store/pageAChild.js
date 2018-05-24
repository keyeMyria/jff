import {observable, action} from "mobx";
import {BaseView, BaseViewStore} from "./BaseViewStore";

export class View extends BaseView {
    @observable value1 = '';
    @observable value2 = '';
}

export default class extends BaseViewStore {

    @action
    handleChange = (e) => {
        this.view[e.target.name] = e.target.value;
    };
}
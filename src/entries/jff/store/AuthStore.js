import {observable, action, computed} from "mobx";
import {BaseView, BaseViewStore} from "JFF/store/BaseViewStore";
import {localStorage} from "JFF/utils/JffStorage";

export class View extends BaseView {
    @observable phone = '';
    @observable pwd = '';
}

export default class extends BaseViewStore {
    @observable authInfo = {};

    constructor(ViewPattern) {
        super(ViewPattern);
        try {
            this.authInfo = JSON.parse(localStorage.getItem('user'));
        }catch (e) {
        }
    }

    @action
    handleChange = (e) => {
        this.view[e.target.name] = e.target.value;
    };

    @action
    handleLogin = () => {
        let authInfo = {token: this.view.phone + this.view.pwd};
        localStorage.putItem('user', JSON.stringify(authInfo));
        this.authInfo = authInfo;
    };

    @computed
    get isAuth() {
        return !!(this.authInfo && this.authInfo.token);
    }
}
import {observable, action} from "mobx";
import {BaseView, BaseViewStore} from "JFF/store/BaseViewStore";
import {setUser} from "JFF/utils/JffStorage";

class View extends BaseView {
    @observable phone = '';
    @observable pwd = '';
}

class LoginStore extends BaseViewStore {

    @action
    handleChange = (e) => {
        this.view[e.target.name] = e.target.value;
    };

    @action
    handleLogin = () => {
        setUser({token: '124'});
    };
}

export default new LoginStore(View);
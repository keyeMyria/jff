import history from 'JFF/routes/history';
import HomeStore from './HomeStore';
import PageEdit, {View as PageEditView} from './pageEdit';
import PageAChild, {View as PageAChildView} from './pageAChild';
import AuthStore, {View as AuthView} from './AuthStore';

const store = {
    pageEdit: new PageEdit(PageEditView),
    pageAChild: new PageAChild(PageAChildView),
    authStore: new AuthStore(AuthView, history)
};

export default store;

export const homeStore = new HomeStore(history, store);
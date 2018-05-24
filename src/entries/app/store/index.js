import history from '../routes/history';
import HomeStore from './HomeStore';
import PageEdit, {View as PageEditView} from './pageEdit';
import PageAChild, {View as PageAChildView} from './pageAChild';

const store = {
    pageEdit: new PageEdit(PageEditView),
    pageAChild: new PageAChild(PageAChildView)
};

export default store;

export const homeStore = new HomeStore(history, store);
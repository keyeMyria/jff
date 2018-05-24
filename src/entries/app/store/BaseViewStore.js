import {createViewModel} from "mobx-utils";

export class BaseViewStore {
    constructor(ViewPattern) {
        this.viewPattern = new ViewPattern();
        this.view = this.getPatternView();
        this.views = new Map();
    }

    getPatternView = () => createViewModel(this.viewPattern);

    resetStoreView = (viewKey, isDrop) => {
        if (isDrop) {
            if (this.views.get(viewKey) === this.view) {
                this.view = undefined;
            }
            this.views.delete(viewKey);
        } else if (viewKey) {
            let view = this.views.get(viewKey);
            if (view) view.reset();
        } else {
            this.view.reset();
        }
    };

    switchView = (newKey) => {
        if (!newKey) return;
        if (this.views.size) {
            let nView = this.views.get(newKey);
            if (!nView) {
                this.views.set(newKey, this.getPatternView());
            }
        } else if (this.view) {
            this.views.set(newKey, this.view);
        } else {
            this.views.set(newKey, this.getPatternView());
        }
        this.view = this.views.get(newKey);
    };
}

export class BaseView {
    constructor() {
        // todo
    }
}
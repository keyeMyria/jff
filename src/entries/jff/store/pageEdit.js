import {observable, action} from "mobx";
import {getBrokerInfo, getLaborInfo} from '../service';
import {BaseView, BaseViewStore} from "./BaseViewStore";

export class View extends BaseView {
    @observable Mobile = '';
    @observable Code = '';
    @observable RecordList = [];
    @observable TabKey = 'tab1';
    @observable getBrokerInfoFetchStatus = 'close';
    @observable getLaborInfoFetchStatus = 'close';
}

export default class extends BaseViewStore {

    @action
    getBrokerInfo = async () => {
        let param = {Mobile: this.view.Mobile};
        this.view.RecordList = [];
        this.view.getBrokerInfoFetchStatus = 'pending';
        try {
            let Data = await getBrokerInfo(param);
            this.view.getBrokerInfoFetchStatus = 'done';
            this.view.RecordList = Data.RecordList || [];
            return Data;
        } catch (error) {
            this.view.getBrokerInfoFetchStatus = 'error';
            console.info(error);
        }
    };

    @action
    doDownload = async () => {
        this.view.getLaborInfoFetchStatus = 'pending';
        try {
            this.view.getLaborInfoFetchStatus = 'done';
            return await getLaborInfo();
        } catch (error) {
            this.view.getLaborInfoFetchStatus = 'error';
            console.info(error);
        }
    };

    @action
    handleInputChange = (e) => {
        this.view[e.target.name] = e.target.value;
    };

    @action
    handleTabChange = (TabKey) => {
        this.view.TabKey = TabKey;
    };
}
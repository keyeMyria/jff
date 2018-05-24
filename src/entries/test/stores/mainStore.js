import React from 'react';
import {observable, action} from "mobx";

class Store {
    @observable selectedTab = 'Home';

    @action
    handleTabChange = (selectedTab) => {
        this.selectedTab = selectedTab;
    };

    @action
    changeDeviceId = (deviceId) => {
        this.deviceId = deviceId;
    };

    @action
    logout = () => {
        this.user = {};
    };
}

export default new Store();


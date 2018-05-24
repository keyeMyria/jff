import React from 'react';
import {observable, action} from "mobx";
import {ServerError} from 'EXCEPTION';

class Store {
    @observable checkInOutRecord = [];
    @observable refreshing = false;

}

export default new Store();


class Storage {
    constructor(name, storage) {
        this.name = name;
        this.storage = storage;
    }

    build() {
        this.storage.setItem(this.name, JSON.stringify({}));
    }

    putItems(putObj) {
        let jsonStr = this.storage.getItem(this.name);
        this.storage.setItem(this.name, JSON.stringify({... JSON.parse(jsonStr), ...putObj}));
    }

    putItem(key, value) {
        let jsonStr = this.storage.getItem(this.name);
        let obj = JSON.parse(jsonStr);
        obj[key] = value;

        this.storage.setItem(this.name, JSON.stringify(obj));
    }

    getItem(key) {
        let jsonStr = this.storage.getItem(this.name);
        let obj = JSON.parse(jsonStr);
        return obj[key];
    }

    removeItem(key) {
        let jsonStr = this.storage.getItem(this.name);
        let obj = JSON.parse(jsonStr);
        delete obj[key];
        this.storage.setItem(this.name, JSON.stringify(obj));
    }

    remove() {
        this.storage.removeItem(this.name);
    }

    clear() {
        this.storage.clear();
    }
}

const name = 'jff_storage';
let localStorage = new Storage(name, self.localStorage);
if (!self.localStorage.getItem(name)) {
    localStorage.build();
}

let sessionStorage = new Storage(name, self.sessionStorage);
if (!self.sessionStorage.getItem(name)) {
    sessionStorage.build();
}

let AppConf = {user: undefined, deviceId: 'b398d976-39ff-3915-b89c-4e7e1eb7e1e8'};

function getUser() {
    if (!AppConf.user) {
        try {
            AppConf.user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            AppConf.user = {};
        }
    }
    return AppConf.user;
}

function setUser(user) {
    AppConf.user = user;
    localStorage.putItem('user', JSON.stringify(user));
}

function getDeviceId() {
    if (!AppConf.deviceId) {
        AppConf.deviceId = localStorage.getItem('deviceId');
    }
    return AppConf.deviceId;
}

function setDevicedId(deviceId) {
    AppConf.deviceId = deviceId;
    localStorage.putItem('deviceId', deviceId);
}

export {
    localStorage, sessionStorage, getUser, setUser, getDeviceId, setDevicedId
};
import Storage from 'UTILS/Storage';

const name = 'jff_storage';

let localStorage = new Storage(name, self.localStorage);
if (!self.localStorage.getItem(name)) {
    localStorage.build();
}

let sessionStorage = new Storage(name, self.sessionStorage);
if (!self.sessionStorage.getItem(name)) {
    sessionStorage.build();
}

export {sessionStorage, localStorage};
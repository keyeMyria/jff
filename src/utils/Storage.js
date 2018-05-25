export default class {
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
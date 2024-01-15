import {Drivers, Storage} from "@ionic/storage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const store: Storage = new Storage({driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]});

async function initStorage() {
    await store.create();
}

async function save(key: string, value: Object) {
    await store.set(key, JSON.stringify(value));
}

async function find(key: string) {
    return JSON.parse(await store.get(key));
}

async function drop(key: string) {
    await store.remove(key);
}

async function clear(){
    await store.clear()
}

export {initStorage, save, find, drop, clear}
import {Drivers, Storage} from "@ionic/storage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import {setupGuide} from "@/utils/GuideBook";

const store: Storage = new Storage({driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]});

async function initStorage() {
    await store.create();
    const isStoreEmpty = (await store.length()) === 0;
    if (isStoreEmpty) await setupGuide();
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

export {initStorage, save, find, drop}
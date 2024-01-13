import {drop, find, save} from "@/utils/StorageWrapper";
import {Entity} from "@/model/Entity";

const indexKey: string = "INDEX";

async function saveIndex(bookIndex: string[]) {
    console.log("savesIndex")
    await save(indexKey, bookIndex);
}

async function retrieveIndex() {
    console.log("retrievesIndex")
    const index = await find(indexKey);
    return (index ? index : []) as string[];
}

async function saveEntity(entity: Entity) {
    console.log("savesEntity")
    await save(entity.id, entity);
}

async function removeEntity(entity: Entity) {
    console.log("removesEntity")
    await drop(entity.id);
}

async function retrieveEntity(key: string) {
    console.log("retrievesEntity")
    return await find(key);
}

async function retrieveEntities(keys: string[]) {
    console.log("retrievesEntities")
    return await Promise.all(keys.map(async (key) => await retrieveEntity(key)));
}

export {saveIndex, retrieveIndex, saveEntity, removeEntity, retrieveEntity, retrieveEntities}

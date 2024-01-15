import {clear, drop, find, save} from "@/utils/StorageWrapper";
import {Entity} from "@/model/Entity";
import {Index} from "@/model/Index";
import {setupGuide} from "@/utils/GuideBook";

const indexKey: string = "INDEX";

async function saveIndex(bookIndex: Index[]) {
    console.log("savesIndex")
    await save(indexKey, bookIndex);
}

async function retrieveIndex() {
    console.log("retrievesIndex")
    let index = await find(indexKey);
    if (!index) {
        index = await setupGuide();
        await saveIndex(index)
    }
    if (index.length === 0) {
        await clear();
        await saveIndex(index)
    }
    return index;
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

async function removeEntities(keys: string[]){
    await keys.forEach((key) => drop(key));
}

async function retrieveEntities(keys: string[]) {
    console.log("retrievesEntities")
    return await Promise.all(keys.map(async (key) => await retrieveEntity(key)));
}

export {saveIndex, retrieveIndex, saveEntity, removeEntity, retrieveEntity, removeEntities, retrieveEntities}

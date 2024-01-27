import {computed, Ref, ref} from "vue";
import {useBookService} from "@/service/BookService";
import {Index} from "@/model/Index";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {removeEntities, retrieveIndex, saveIndex} from "@/database/PersistencyService";
import {useLibraryService} from "@/service/LibraryService";

const indexes: Ref<Index[]> = ref([]);

const bookIndexes = computed(() => {
    return indexes.value.map((index) => index.bookId);
})

const pageIndexes = computed(() => {
    return getCurrentBookIndex().pagesId;
})

async function initIndexer() {
    const indexesState = await retrieveIndex();
    indexes.value = (indexesState ? indexesState : []) as Index[];
}

async function updateBooks() {
    const currentBookIndexes = getCurrentBookIndexes();
    const indexesToRemove = indexes.value.filter((index) => !currentBookIndexes.includes(index.bookId))
    indexesToRemove.forEach((index) => removeEntities(index.pagesId));
    indexesToRemove.forEach((index) => ripFromArray(indexes.value, index));
    const indexesToAdd = currentBookIndexes.filter((bookId) => !indexes.value.map((index) => index.bookId).includes(bookId));
    indexesToAdd.forEach((bookId) => putToArray(indexes.value, new Index(bookId)));
    sortIndex(currentBookIndexes);
    await saveIndex(indexes.value)
}

async function updatePages() {
    getCurrentBookIndex().pagesId = getCurrentPageIndexes();
    await saveIndex(indexes.value)
}

function sortIndex(currentIndexes: string[]){
    const sortedIndex = [];
    currentIndexes.forEach((currentIndex) => sortedIndex.push(indexes.value.find((index) => index.bookId == currentIndex)))
    indexes.value = sortedIndex;
}

function getCurrentBookIndex() {
    return indexes.value.find((index) => index.bookId === useBookService().book.id)
}

function getCurrentBookIndexes() {
    return useLibraryService().library.map((book) => book.id);
}

function getCurrentPageIndexes() {
    return useBookService().pages.map((page) => page.id);
}

export {bookIndexes, pageIndexes, initIndexer, updateBooks, updatePages}

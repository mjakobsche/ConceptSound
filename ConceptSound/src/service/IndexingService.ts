import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {drop, find, save} from "@/utils/StorageWrapper";
import {useBookService} from "@/service/BookService";
import {Index} from "@/model/Index";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {removeEntities, retrieveIndex, saveIndex} from "@/utils/PersistencyService";
import {useLibraryService} from "@/service/LibraryService";

export const useIndexingService = defineStore('indexingService', () => {
    const indexes: Ref<Index[]> = ref([]);
    const bookService = useBookService();

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
        await saveIndex(indexes.value)
    }

    async function updatePages() {
        getCurrentBookIndex().pagesId = getCurrentPageIndexes();
        await saveIndex(indexes.value)
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

    return {bookIndexes, pageIndexes, initIndexer, updateBooks, updatePages}
});

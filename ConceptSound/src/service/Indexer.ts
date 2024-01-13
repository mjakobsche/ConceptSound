import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {find, save} from "@/utils/StorageWrapper";
import {useBookService} from "@/service/BookService";
import {Index} from "@/model/Index";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";

export const useIndexer = defineStore('indexer', () => {
    const indexes: Ref<Index[]> = ref([]);
    const store = useBookService();

    const bookIndexes = computed(() => {
        return indexes.value.map((index) => index.bookId);
    })

    const pageIndexes = computed(() => {
        return getCurrentBookIndex().pagesId;
    })

    async function initIndexer() {
        const indexesState = await find("indexesState");
        indexes.value = (indexesState ? indexesState : []) as Index[];
    }

    async function updateBooks() {
        const currentBookIndexes = getCurrentBookIndexes();
        const indexesToRemove = indexes.value.filter((index) => !currentBookIndexes.includes(index.bookId))
        indexesToRemove.forEach((index) => ripFromArray(indexes.value, index));
        const indexesToAdd = currentBookIndexes.filter((bookId) => !indexes.value.map((index) => index.bookId).includes(bookId));
        indexesToAdd.forEach((bookId) => putToArray(indexes.value, new Index(bookId)));
        await save("indexesState", indexes.value);
    }

    async function updatePages() {
        getCurrentBookIndex().pagesId = getCurrentPageIndexes();
        await save("indexesState", indexes.value);
    }

    function getCurrentBookIndex() {
        return indexes.value.find((index) => index.bookId === store.book.id)
    }

    function getCurrentBookIndexes() {
        return store.library.map((book) => book.id);
    }

    function getCurrentPageIndexes() {
        return store.pages.map((page) => page.id);
    }

    return {bookIndexes, pageIndexes, initIndexer, updateBooks, updatePages}
});

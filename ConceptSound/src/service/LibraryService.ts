import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref} from "vue";
import {Book} from "@/model/Book";
import {retrieveEntities, retrieveIndex, saveEntity, saveIndex} from "@/utils/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {boat} from "ionicons/icons";

export const useLibraryService = defineStore('libraryService', () => {
    const library: Ref<Book[]> = ref([]);
    const tags: ComputedRef<string[]> = computed(() => {
        return [...new Set(library.value.flatMap((book: Book) => book.tags))];
    })

    function initLibrary() {
        retrieveIndex().then((index: string[]) => retrieveEntities(index)).then((books: Book[]) => library.value = books);
    }

    async function addBook(title: string) {
        const book: Book = new Book(title);
        await saveEntity(book);
        putToArray(library.value, book);
        await saveIndex(library.value.map((book) => book.id))
    }

    async function moveToTop(book: Book){
        putToArray(library.value, ripFromArray(library.value, book))
        await saveIndex(library.value.map((book) => book.id))
    }

    async function removeBook(book: Book) {
        ripFromArray(library.value, book);
        await saveIndex(library.value.map((book) => book.id))
        await saveEntity(book);
    }

    return {library, tags, initLibrary, addBook, moveToTop, removeBook}
});

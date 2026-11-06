import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {Book} from "@/model/Book";
import {removeEntity, retrieveEntities, saveEntity} from "@/database/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {bookIndexes, initIndexer, updateBooks} from "@/database/Indexer";

export const useLibraryService = defineStore('libraryService', () => {
    const library: Ref<Book[]> = ref([]);

    function initLibrary() {
        initIndexer().then(() => {
            retrieveEntities(bookIndexes.value).then((books) => {
                library.value = books;
            })
        });
    }

    async function addBook(title: string) {
        const book: Book = new Book(title);
        await saveEntity(book);
        putToArray(library.value, book);
        await updateBooks();
    }

    async function moveToTop(book: Book) {
        putToArray(library.value, ripFromArray(library.value, book))
        await updateBooks();
    }

    async function removeBook(book: Book) {
        ripFromArray(library.value, book);
        await updateBooks();
        await removeEntity(book);
    }

    return {library, initLibrary, addBook, moveToTop, removeBook}
})
import {defineStore} from "pinia";
import {useIndexingService} from "@/service/IndexingService";
import {ref, Ref} from "vue";
import {Book} from "@/model/Book";
import {removeEntity, retrieveEntities, saveEntity} from "@/utils/PersistencyService";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";

export const useLibraryService = defineStore('libraryService', () => {
    const indexer = useIndexingService();
    const library: Ref<Book[]> = ref([]);

    function initLibrary() {
        indexer.initIndexer().then(() => {
            retrieveEntities(indexer.bookIndexes).then((books) => {
                library.value = books;
            })
        });
    }

    async function addBook(title: string) {
        const book: Book = new Book(title);
        await saveEntity(book);
        putToArray(library.value, book);
        await indexer.updateBooks();
    }

    async function moveToTop(book: Book) {
        putToArray(library.value, ripFromArray(library.value, book))
        await indexer.updateBooks();
    }

    async function removeBook(book: Book) {
        ripFromArray(library.value, book);
        await indexer.updateBooks();
        await removeEntity(book);
    }

    return {library, initLibrary, addBook, moveToTop, removeBook}
})
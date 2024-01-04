import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref} from "vue";
import {BookCover} from "@/model/BookCover";
import {BookPage} from "@/model/BookPage";
import {
    getPersistedBookPages,
    getPersistedBooks,
    persistBookPagesChanges,
    persistBooksChanges,
} from "@/service/PersistencyService";

export const useStoreService = defineStore('store', () => {

    const library: Ref<BookCover[]> = ref([]);
    const bookCover: Ref<BookCover> = ref(new BookCover(""));
    const bookPages: Ref<BookPage[]> = ref([]);
    const tags: ComputedRef<string[]> = computed(() => {
        return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
    })


    async function prepareLibrary() {
        library.value = await getPersistedBooks();
    }

    async function prepareBook(book: BookCover) {
        book.lastUsed = new Date();
        bookCover.value = book;
        bookPages.value = await getPersistedBookPages(book.id);
        updateBookOrder();
        saveLibrary();
    }

    function saveLibrary() {
        persistBooksChanges(library.value).catch((e) => console.log("could not persist book pages\n" + e));
    }

    function savePages() {
        persistBookPagesChanges(bookCover.value.id, bookPages.value).catch((e) => console.log("could not persist book pages\n" + e));
    }

    function updateBookOrder() {
        library.value.sort((x: BookCover, y: BookCover) => new Date(y.lastUsed) - new Date(x.lastUsed))
    }

    return {savePages, prepareBook, prepareLibrary, saveLibrary, updateBookOrder, bookCover, bookPages, library, tags}
})
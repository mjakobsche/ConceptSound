import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref} from "vue";
import {BookCover} from "@/model/BookCover";
import {BookPage} from "@/model/BookPage";
import {Drivers, Storage} from "@ionic/storage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

export const useStoreService = defineStore('store', () => {
    const store: Storage = new Storage({driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]});
    const library: Ref<BookCover[]> = ref([]);
    const bookCover: Ref<BookCover> = ref(new BookCover(""));
    const bookPages: Ref<BookPage[]> = ref([]);
    const tags: ComputedRef<string[]> = computed(() => {
        return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
    })


    async function prepareLibrary() {
        await store.create();
        const persistedLibrary = await store.get("library");
        library.value = persistedLibrary ? JSON.parse(persistedLibrary) : [];
    }

    async function prepareBook(book: BookCover) {
        book.lastUsed = new Date();
        bookCover.value = book;
        const persistedPages = await store.get(book.id);
        bookPages.value = persistedPages ? JSON.parse(persistedPages) : [];
        updateBookOrder();
        saveLibrary();
    }

    function saveLibrary() {
        store.set("library", JSON.stringify(library.value)).catch((e) => console.log("could not persist book pages\n" + e));
    }

    function savePages() {
        store.set(bookCover.value.id, JSON.stringify(bookPages.value)).catch((e) => console.log("could not persist book pages\n" + e));
    }

    function updateBookOrder() {
        library.value.sort((x: BookCover, y: BookCover) => new Date(y.lastUsed) - new Date(x.lastUsed))
    }

    return {savePages, prepareBook, prepareLibrary, saveLibrary, updateBookOrder, bookCover, bookPages, library, tags}
})
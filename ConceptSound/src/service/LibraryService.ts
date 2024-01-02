import {BookCover} from "@/model/BookCover";
import {computed, ComputedRef, ref, Ref, watch, watchEffect} from "vue";
import {getPersistedBooks, persistBooksChanges,} from "@/service/Writer";

const library: Ref<BookCover[]> = ref([]);

const setupCompleted: Ref<boolean> = ref(false);
function saveBooks(){
    persistBooksChanges(library.value).catch((e) => console.log("could not persist book pages\n" + e));
}

const tags: ComputedRef<string[]> = computed(() => {
    return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
})

async function setupLibraryService() {
    library.value = await getPersistedBooks();
    setupCompleted.value = true;
}

function addBook(title: string) {
    library.value.unshift(new BookCover(title));
    saveBooks();
}

function remBook(id: string) {
    library.value.splice(library.value.findIndex((bookCover: BookCover) => bookCover.id === id), 1)
    saveBooks();
}

export {setupLibraryService, library, tags, addBook, remBook};
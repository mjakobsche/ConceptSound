import {BookCover} from "@/model/BookCover";
import {ref, Ref, watch} from "vue";
import {
    assurePagesFilesIntegrity,
    getPersistedBooks,
    persistBooksChanges,
    setModificationDates
} from "@/service/Writer";
import {initialize} from "@/initialization/Initializer";
import {openBook} from "@/service/BookService";

let library: Ref<BookCover[]> = ref([]);

async function setupLibrary() {
    await initialize();
    library.value = await getPersistedBooks();
    watch(library.value, async () => {
        await persistBooksChanges(library.value)
    });
}

function addBook(title: string) {
    library.value.push(new BookCover(title));
}

function remBook(id: string) {
    library.value.splice(library.value.findIndex((bookCover) => bookCover.id === id), 1)
}

export {setupLibrary, library, addBook, remBook};
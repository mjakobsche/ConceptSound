import {BookCover} from "@/model/BookCover";
import {ref, Ref, watch} from "vue";
import {getPersistedBooks, persistBooksChanges,} from "@/service/Writer";

let library: Ref<BookCover[]> = ref([]);

async function setupLibrary() {
    library.value = await getPersistedBooks();
    watch(library.value, async () => {
        console.log("persisting book changes...")
        await persistBooksChanges(library.value)
        console.log("...persisted!")
    });
}

function addBook(title: string) {
    library.value.push(new BookCover(title));
}

function remBook(id: string) {
    library.value.splice(library.value.findIndex((bookCover) => bookCover.id === id), 1)
}

export {setupLibrary, library, addBook, remBook};
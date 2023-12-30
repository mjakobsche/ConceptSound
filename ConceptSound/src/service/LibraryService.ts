import {BookCover} from "@/model/BookCover";
import {computed, ComputedRef, ref, Ref, watch} from "vue";
import {getPersistedBooks, persistBooksChanges,} from "@/service/Writer";

const library: Ref<BookCover[]> = ref([]);
const tags: ComputedRef<string[]> = computed(() => {
    return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
})

async function setupLibrary() {
    library.value = await getPersistedBooks();
    watch(library.value, async () => {
        console.log("persisting book changes...")
        await persistBooksChanges(library.value)
        console.log("...persisted!")
    });
}

function addBook(title: string) {
    library.value.unshift(new BookCover(title));
}

function remBook(id: string) {
    library.value.splice(library.value.findIndex((bookCover) => bookCover.id === id), 1)
}

export {setupLibrary, library, tags, addBook, remBook};
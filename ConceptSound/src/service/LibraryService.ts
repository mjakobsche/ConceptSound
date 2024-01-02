import {BookCover} from "@/model/BookCover";
import {computed, ComputedRef, ref, Ref} from "vue";
import {getPersistedBooks, persistBooksChanges,} from "@/service/Writer";

const library: Ref<BookCover[]> = ref([]);

const tags: ComputedRef<string[]> = computed(() => {
    return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
})

async function setupLibraryService() {
    library.value = await getPersistedBooks();
}

function saveLibrary() {
    persistBooksChanges(library.value).catch((e) => console.log("could not persist book pages\n" + e));
}


export {library, tags, setupLibraryService, saveLibrary};
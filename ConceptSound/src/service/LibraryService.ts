import {BookCover} from "@/model/BookCover";
import {computed, ComputedRef, ref, Ref} from "vue";
import {getPersistedBooks, persistBooksChanges, setModificationDates,} from "@/service/Writer";

const library: Ref<BookCover[]> = ref([]);

const tags: ComputedRef<string[]> = computed(() => {
    return [...new Set(library.value.flatMap((bookCover: BookCover) => bookCover.tags))];
})

async function setupLibraryService() {
    library.value = await getPersistedBooks();
    updateBookOrder()
}

function saveLibrary() {
    persistBooksChanges(library.value).catch((e) => console.log("could not persist book pages\n" + e));
}

function updateBookOrder() {
    setModificationDates(library.value).then(() => {
        library.value.sort(
            function (bookCoverA, bookCoverB) {
                return  bookCoverB.modificationDate - bookCoverA.modificationDate;
            }
        )
    })
}

export {library, tags, setupLibraryService, updateBookOrder, saveLibrary};
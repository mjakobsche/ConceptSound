import {ref, Ref, watch} from "vue";
import {BookPage} from "@/model/BookPage";
import {BookCover} from "@/model/BookCover";
import {getPersistedBookPages, persistBookPagesChanges} from "@/service/Writer";

const bookCover: Ref<BookCover> = ref(new BookCover(""));
const bookPages: Ref<BookPage[]> = ref([]);

function savePages(){
    persistBookPagesChanges(bookCover.value.id, bookPages.value).catch((e) => console.log("could not persist book pages\n" + e));
}

async function setupBookService(book: BookCover) {
    bookCover.value = book;
    bookPages.value = await getPersistedBookPages(book.id)
}

export {setupBookService, savePages, bookPages, bookCover };

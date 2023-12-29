import {ref, Ref, watch} from "vue";
import {BookPage} from "@/model/BookPage";
import {BookCover} from "@/model/BookCover";
import {getPersistedBookPages, persistBookPagesChanges} from "@/service/Writer";

const bookCover: Ref<BookCover> = ref(new BookCover(""));
const bookPages: Ref<BookPage[]> = ref([]);

async function openBook(book: BookCover){
    bookCover.value = book;
    bookPages.value = await getPersistedBookPages(book.id)
    console.log(bookPages);
    watch(bookPages.value, async () => {
        console.log("run update")
        await persistBookPagesChanges(book.id, bookPages.value);
    });
}

function addPage(type: string): void {
    bookPages.value.push(new BookPage(bookPages.value.length, type));
}

function hidePage(id: string): void {
    //const page: BookPage = bookPages.value.find((b) => b.id === id);
}

function remPage(id: string) {
    bookPages.value.splice(bookPages.value.findIndex((bookPage: BookPage)=> bookPage.id === id), 1)
}

function swapPage(from = 0, to = 0) {
    const page: BookPage = bookPages.value.splice(from, 1)[0];
    bookPages.value.splice(to, 0, page);
}

function modPage(page: BookPage) {
    //const pageIndex = bookPages.value.findIndex((t) => t.id == page.id);
    //bookPages[pageIndex] = page;
}

export {openBook, addPage, bookPages, bookCover, remPage, hidePage, swapPage, modPage};

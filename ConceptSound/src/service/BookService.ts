import {ref, Ref, watch} from "vue";
import {BookPage} from "@/model/BookPage";
import {BookCover} from "@/model/BookCover";
import {getPersistedBookPages, persistBookPagesChanges} from "@/service/Writer";

const bookCover: Ref<BookCover> = ref(new BookCover(""));
const bookPages: Ref<BookPage[]> = ref([]);

async function openBook(book: BookCover){
    bookCover.value = book;
    bookPages.value = await getPersistedBookPages(book.id)
    watch(bookPages.value, async () => {
        console.log("persisting page changes...")
        await persistBookPagesChanges(book.id, bookPages.value);
        console.log("...persisted!")
    });
}

function addPage(type: string): void {
    putPage(new BookPage(bookPages.value.length, type), 0);
}

function hidePage(id: string): void {
    const pageNumber: number = findPageNumber(id);
    const page: BookPage = ripPage(pageNumber);
    page.hidden = !page.hidden;
    putPage(page, pageNumber);
}

function modPage(page: BookPage) {
    console.log("unnecessary call for modPage");
}

function remPage(id: string): void {
    ripPage(findPageNumber(id));
}

function swapPage(from = 0, to = 0): void {
    putPage(ripPage(from), to);
}

function findPageNumber(id: string): number {
    return bookPages.value.findIndex((bookPage: BookPage) => bookPage.id == id);
}

function ripPage(pageNumber: number): BookPage {
    return bookPages.value.splice(pageNumber, 1)[0];
}

function putPage(page: BookPage, pageNumber: number): void{
    bookPages.value.splice(pageNumber, 0, page);
}

export {openBook, addPage, bookPages, bookCover, remPage, hidePage, swapPage, modPage};

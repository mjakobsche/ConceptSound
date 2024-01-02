import {ref, Ref, watch} from "vue";
import {BookPage} from "@/model/BookPage";
import {BookCover} from "@/model/BookCover";
import {getPersistedBookPages, persistBookPagesChanges} from "@/service/Writer";

const bookCover: Ref<BookCover> = ref(new BookCover(""));
const bookPages: Ref<BookPage[]> = ref([]);

function savePages(){
    console.log("saved")
    persistBookPagesChanges(bookCover.value.id, bookPages.value).catch((e) => console.log("could not persist book pages\n" + e));
}

async function setupBookService(book: BookCover) {
    bookCover.value = book;
    bookPages.value = await getPersistedBookPages(book.id)
}

function addTag(tag: string): void {
    bookCover.value.tags.unshift(tag);
}

function remTag(tag: string): void {
    bookCover.value.tags.splice(bookCover.value.tags.indexOf(tag), 1);
}

function addPage(type: string): void {
    putPage(new BookPage(type), 0);
    savePages();
}

function hidePage(id: string): void {
    const pageNumber: number = findPageNumber(id);
    const page: BookPage = ripPage(pageNumber);
    page.hidden = !page.hidden;
    putPage(page, pageNumber);
    savePages();
}

function remPage(id: string): void {
    ripPage(findPageNumber(id));
    savePages();
}

function swapPage(from = 0, to = 0): void {
    putPage(ripPage(from), to);
    savePages();
}

function findPageNumber(id: string): number {
    return bookPages.value.findIndex((bookPage: BookPage) => bookPage.id == id);
}

function ripPage(pageNumber: number): BookPage {
    return bookPages.value.splice(pageNumber, 1)[0];
}

function putPage(page: BookPage, pageNumber: number): void {
    bookPages.value.splice(pageNumber, 0, page);
}

export {setupBookService, savePages, addTag, remTag, addPage, bookPages, bookCover, remPage, hidePage, swapPage};

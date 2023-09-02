import {Book} from "@/model/Book";
import {ref, Ref, watch} from "vue";
import {Page} from "@/model/Page";
import inMemoryData from "@/data/InMemoryData";

const data = inMemoryData;
const book: Ref<Book> = ref(data.value[0]);

function setBook(newBook: Book) {
    book.value = newBook;
    watch(book.value.pages, () => {
        update(book.value);
    });
}

function addPage(type: string) {
    const bookIndex = book.value.pages.length;
    let initData = "";
    if (type == "score") {
        initData = "X:1\nK:D\n";
    }

    book.value.pages.push({
        id: bookIndex,
        type: type,
        name: type,
        data: initData,
        hidden: false,
    });
}

function hidePage(id: number) {
    const page = book.value.pages.find((t) => t.id == id);
    if (page != undefined) {
        page.hidden = !page.hidden;
    }
}

function remPage(id: number) {
    const page = book.value.pages.find((t) => t.id == id);
    if (page != undefined) {
        book.value.pages.splice(book.value.pages.indexOf(page), 1);
    }
}

function swapPage(from = 0, to = 0) {
    const page = book.value.pages.splice(from, 1)[0];
    book.value.pages.splice(to, 0, page);
}

function modPage(page: Page) {
    const pageIndex = book.value.pages.findIndex((t) => t.id == page.id);
    book.value.pages[pageIndex] = page;
}

function update(book: Book): void {
    const bookIndex = data.value.findIndex(
        (b) => b.cover.id == book.cover.id
    );
    if (bookIndex == -1) throw "explicit book not found";
    data.value[bookIndex] = book;
}

export {book, setBook, addPage, remPage, hidePage, swapPage, modPage};

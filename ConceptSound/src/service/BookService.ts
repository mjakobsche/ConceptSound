import {Book} from "../model/Book";
import {computed, ComputedRef,} from "vue";
import {setBook} from "./PageService"
import {findAllBooks} from "@/service/Writer";

let data = await findAllBooks();

const library: ComputedRef<Book[]> = computed(() => {
    return data;
});

function addBook(title: string) {
    data.push(new Book(selectMaxId(), title));
}

function remBook(id: number) {
    data = data.filter((b) => b != selectBookById(id));
    const maxId = selectMaxId();
    if (maxId > 1) {
        data[maxId].id = id;
    }
}

function openBook(id: number) {
    setBook(selectBookById(id));
}

function selectBookById(id: number): Book {
    const books: Book[] = data.filter((b) => b.id == id);
    if (books.length != 1) throw "explicit book not found";
    return books[0];
}

function selectMaxId(): number {
    return library.value.length - 1;
}

export {library, addBook, remBook, openBook};

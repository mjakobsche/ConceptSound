import {Cover} from "../model/Cover";
import {Book} from "../model/Book";
import {computed, ComputedRef,} from "vue";
import inMemoryData from "@/data/InMemoryData";
import {setBook} from "./BookService"

const data = inMemoryData;

const library: ComputedRef<Cover[]> = computed(() => {
    const covers: Cover[] = [];
    data.value.forEach((book) => {
        covers.push(book.cover);
    });
    return covers;
});

function addBook(title: string) {
    const book: Book = {
        cover: {id: selectMaxId() + 1, title: title, date: new Date()},
        pages: [],
    };
    data.value.push(book);
}

function remBook(id: number) {
    data.value = data.value.filter((b) => b != selectBookById(id));
    const maxId = selectMaxId();
    if (maxId > 1) {
        data.value[maxId].cover.id = id;
    }
}

function openBook(id: number) {
    setBook(selectBookById(id));
}

function selectBookById(id: number): Book {
    const books: Book[] = data.value.filter((b) => b.cover.id == id);
    if (books.length != 1) throw "explicit book not found";
    return books[0];
}

function selectMaxId(): number {
    return library.value.length - 1;
}

export {library, addBook, remBook, openBook};

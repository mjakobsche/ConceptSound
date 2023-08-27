import {InMemoryBookDao} from "@/dao/InMemoryBookDao";
import {Book} from "@/model/Book";
import {Cover} from "@/model/Cover";
import {computed, ComputedRef,} from "vue";

const bookDao: InMemoryBookDao = new InMemoryBookDao();

const library: ComputedRef<Cover[]> = computed(() => {
    return bookDao.findAllCovers()
});

function addBook(title: string) {
    const book: Book = {
        cover: {id: bookDao.findMaxId(), title: title, date: new Date()},
        pages: [],
    };
    bookDao.save(book);
}

function remBook(id: number) {
    const book: Book = bookDao.findById(id);
    bookDao.delete(book);
}

export {library, addBook, remBook};

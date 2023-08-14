import { BookDao } from "@/dao/BookDao";
import { InMemoryBookDao } from "@/dao/InMemoryBookDao";
import { Book } from "@/model/Book";
import { Cover } from "@/model/Cover";
import { Ref, ref } from "vue";

const bookDao: InMemoryBookDao = new InMemoryBookDao();

const library: Ref<Cover[]> = ref(bookDao.findAllCovers());

function addBook(title: string) {
	let book: Book = {
		cover: { id: bookDao.findMaxId(), title: title, date: new Date() },
		pages: [],
	};
	bookDao.save(book);
}

function remBook(id: number) {
	let book: Book = bookDao.findById(id);
	bookDao.delete(book);
}

export { library, addBook, remBook };

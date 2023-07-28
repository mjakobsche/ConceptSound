import storage from "@/data/Storage";
import { Book } from "./Book";
import { BookCover } from "./BookCover";

function getLibrary() {
	let library = storage
		.map((book) => ({
			id: book.id,
			title: book.title,
			date: book.date,
		}))
		.sort((a, b) => b.date.getTime() - a.date.getTime());
	return library;
}

function getBookCover(id: number) {
	let book = storage.find((p) => p.id == id);

	if (!book) {
		return;
	}
	let bookCover: BookCover = {
		id: book.id,
		title: book.title,
		date: book.date,
	};
	return bookCover;
}

function addNewBook(title: string) {
	let bookIndex = storage.length;
	storage.push({
		id: bookIndex,
		title: title,
		date: new Date(),
		content: [],
	});
	return { id: bookIndex };
}

export { getLibrary, getBookCover, addNewBook };

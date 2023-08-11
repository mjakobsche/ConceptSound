import storage from "@/data/InitialLibrary";
import { BookCover } from "../model/Cover";
import { Book } from "../model/Book";

function acquireOnlyCovers(books: Book[]) {
	return books.map((book) => ({
		id: book.id,
		title: book.title,
		date: book.date,
	}));
}

function getLibrary() {
	let library: BookCover[] = [];
	library = acquireOnlyCovers(storage);
	library = library.sort((a, b) => b.date.getTime() - a.date.getTime());
	return library;
}

function getBook(id: number) {
	let books: Book[] = [];
	books = storage.filter((p) => p.id == id);
	let bookCover: BookCover[] = acquireOnlyCovers(books);
	return bookCover[0];
}

function openBook(id: number) {
	let books: Book[] = storage.filter((p) => p.id == id);
	return books[0];
}

export { getLibrary, getBook, openBook };

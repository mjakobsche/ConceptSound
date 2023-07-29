import storage from "@/data/Storage";
import { Book } from "./Book";

function createBook(title: string) {
	let newBookIndex = storage.length;
	storage.push({
		id: newBookIndex,
		title: title,
		date: new Date(),
		content: [],
	});
	return { status: "success", newBookIndex: newBookIndex };
}

function updateBook(book: Book) {
	storage[book.id] = book;
	return { status: "success", thisBookIndex: book.id };
}

function deleteBook(id: number) {
	let lastBookIndex = storage.length - 1;
	if (storage.length > 1) {
		storage[id] = storage[lastBookIndex];
		lastBookIndex = id;
	}
	storage.pop();

	return { status: "success", lastBookIndex: lastBookIndex };
}

export { createBook, updateBook, deleteBook };

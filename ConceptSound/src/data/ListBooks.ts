import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import Book from "@/model/Book";

async function initializeLibrary() {
	await Filesystem.mkdir({
		path: "musicBooks/Przewodnik",
		directory: Directory.Data,
		recursive: true,
	});
	await Filesystem.mkdir({
		path: "musicBooks/Arasi",
		directory: Directory.Data,
		recursive: true,
	});
	await Filesystem.mkdir({
		path: "musicBooks/Four Odes to Belobog",
		directory: Directory.Data,
		recursive: true,
	});
	return;
}

async function scanLibrary() {
	let Library = await Filesystem.readdir({
		path: "",
		directory: Directory.Data,
	});
	if (Library.files.length == 0) {
		await initializeLibrary();
	}
	let Books = await Filesystem.readdir({
		path: "musicBooks/",
		directory: Directory.Data,
	});
	return Books;
}

async function getBooks() {
	let Books = await scanLibrary();
	let ListBooks: Book[] = [];

	Books.files.forEach((element) => {
		ListBooks.push({ name: element.name, altered: element.mtime });
	});

	ListBooks.sort((a, b) => a.altered - b.altered);

	return ListBooks;
}

let books = await getBooks();

export default books;

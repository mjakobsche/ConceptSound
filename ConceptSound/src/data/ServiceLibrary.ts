import library from "./Storage";
import { Page } from "./Page";

function getLibrary() {
	library.value = library.value.sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);
	return library;
}

function modLibrary(action: string, args: string) {
	switch (action) {
		case "add":
			let bookIndex = library.value.length;
			library.value.unshift({
				id: bookIndex,
				title: args,
				date: new Date(),
				content: [],
			});
			break;
		case "rem":
			library.value = library.value.filter((t) => t.id.toString() !== args);
			break;
	}
}

function getBook(id: number) {
	return library.value[id];
}

function modBook(id: number, action: string, arg: Page) {
	let book = getBook(id);
	switch (action) {
		case "add":
			book.content.push(arg);
			break;
		case "swap":
			book.content[arg.id] = arg;
			break;
		case "rem":
			book.content = book.content.filter((t) => t.id !== arg.id);
			break;
	}
}

export { getLibrary, modLibrary, getBook, modBook };

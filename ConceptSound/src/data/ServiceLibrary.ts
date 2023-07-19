import library from "./Storage";

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
				name: args,
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

function modBook(id: number, action: string, args: string[]) {
	let book = getBook(id);
	switch (action) {
		case "add":
			if (args.length != 2) {
				return;
			}
			let pageIndex = book.content.length;
			book.content.push({ id: pageIndex, type: args[0], data: args[1] });
			break;
		case "rem":
			book.content = book.content.filter((t) => t.id.toString() !== args[0]);
			break;
	}
}

export { getLibrary, modLibrary, getBook, modBook };

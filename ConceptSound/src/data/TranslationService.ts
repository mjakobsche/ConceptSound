// import storage from "./Storage";
// import { Book } from "./Book";
// import { BookCover } from "./BookCover";
// import { Ref, ref } from "vue";

// let library: BookCover[] = [];

// function getLibrary() {
// 	storage.forEach((element) => {
// 		library.push({ id: element.id, date: element.date, title: element.title });
// 	});
// 	// library = storage.sort(
// 	// 	(a, b) => b.date.getTime() - a.date.getTime()
// 	// );
// 	return library;
// }

// function modLibrary();

// // function modLibrary(action: string, args: string) {
// // 	switch (action) {
// // 		case "add":
// // 			let bookIndex = storage.value.length;
// // 			storage.value.unshift({
// // 				id: bookIndex,
// // 				title: args,
// // 				date: new Date(),
// // 				content: [],
// // 			});
// // 			break;
// // 		case "rem":
// // 			storage.value = storage.value.filter((t) => t.id.toString() !== args);
// // 			break;
// // 	}
// // }

// function getBook(id: number) {
// 	return storage[id];
// }

// function modBook(book: Book) {
// 	storage[book.id] = book;
// 	console.log("saved");
// }

// export { getLibrary, modLibrary, getBook, modBook };

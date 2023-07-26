import { defineStore } from "pinia";
import { ref } from "vue";
import storage from "@/data/Storage";
export const useCurrentLibrary = defineStore("currentLibrary", () => {
	const library = ref(storage);

	function remBook(id: number) {
		storage[id] = storage[storage.length - 1];
		storage.pop();
	}
	function addBook(title: string) {
		let bookIndex = storage.length;
		storage.unshift({
			id: bookIndex,
			title: title,
			date: new Date(),
			content: [],
		});
	}

	return { library, remBook, addBook };
});
//.map((book) => ({
// 	id: book.id,
// 	title: book.title,
// 	date: book.date,
// }))
// .sort((a, b) => b.date.getTime() - a.date.getTime());

import { defineStore } from "pinia";
import { ref } from "vue";
import storage from "@/data/Storage";
import { getLibrary, addNewBook, getBookCover } from "@/data/LibraryService";
export const useCurrentLibrary = defineStore("currentLibrary", () => {
	const library = ref(getLibrary());
	function remBook(id: number) {
		storage[id] = storage[storage.length - 1];
		storage.pop();
	}
	function addBook(title: string) {
		let result = addNewBook(title);
		let book = getBookCover(result.id);
		if (!book) {
			return;
		}
		library.value.unshift(book);
	}

	return { library, remBook, addBook };
});

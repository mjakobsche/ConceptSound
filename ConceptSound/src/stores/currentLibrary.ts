import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import storage from "@/data/Storage";
import { getBook, getLibrary } from "@/data/LibraryProvider";
import { createBook, deleteBook } from "@/data/LibraryCommander";
export const useCurrentLibrary = defineStore("currentLibrary", () => {
	const library = ref(getLibrary());

	function addBook(title: string) {
		let result = createBook(title);
		if (result.status == "success") {
			let newBook = getBook(result.newBookIndex);
			library.value.unshift(newBook);
		}
	}

	function remBook(id: number) {
		let result = deleteBook(id);
		if (result.status == "success") {
			library.value = library.value.filter((t) => t.id != id);
			if (result.lastBookIndex == id) {
				let lastIndex = library.value.length - 1;
				library.value[lastIndex].id = result.lastBookIndex;
			}
		}
	}

	return { library, addBook, remBook };
});

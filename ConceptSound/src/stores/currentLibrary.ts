import { defineStore } from "pinia";
import { ref, computed } from "vue";
import storage from "@/data/Storage";

export const useCurrentLibrary = defineStore("currentLibrary", () => {
	const library = ref(storage);
	const getBook = computed(() => {
		return (id: number) => library.value[id];
	});
	function remBook(id: number) {
		library.value = library.value.filter((t) => t.id !== id);
	}
	function addBook(title: string) {
		let bookIndex = library.value.length;
		library.value.unshift({
			id: bookIndex,
			title: title,
			date: new Date(),
			content: [],
		});
	}
	return { library, getBook, remBook, addBook };
});

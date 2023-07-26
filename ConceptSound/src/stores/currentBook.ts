import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { Book } from "@/data/Book";
import storage from "@/data/Storage";

export const useCurrentBook = defineStore("currentBook", () => {
	let emptyBook: Book = {
		id: -1,
		title: "ERROR",
		date: new Date(),
		content: [],
	};
	const book = ref(emptyBook);

	const unwatch = watch(book.value.content, () => {});
	function loadBook(id: number) {
		unwatch();
		book.value = storage[id];

		watch(book.value.content, () => {
			console.log("modified");
		});
	}

	const getPage = computed(() => {
		return (id: number) => book.value.content[id];
	});
	function remPage(id: number) {
		book.value.content = book.value.content.filter((t) => t.id !== id);
	}
	function addPage(type: string) {
		let bookIndex = book.value.content.length;
		let initData;
		switch (type) {
			case "score":
				initData = "X:1\nK:D\n";
				break;
			default:
				initData = "";
				break;
		}
		book.value.content.push({
			id: bookIndex,
			type: type,
			name: type,
			data: initData,
			hidden: false,
		});
	}

	return { loadBook, book, getPage, addPage, remPage };
});

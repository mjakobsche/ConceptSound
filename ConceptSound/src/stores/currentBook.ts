import { defineStore } from "pinia";
import { Ref, ref, watch, computed } from "vue";
import { Book } from "@/data/Book";
import storage from "@/data/Storage";
import { emptyBook } from "@/errors/emptyBook";
import { openBook } from "@/data/LibraryProvider";
import { updateBook } from "@/data/LibraryCommander";
export const useCurrentBook = defineStore("currentBook", () => {
	const book: Ref<Book> = ref(emptyBook);

	const getPage = computed(() => {
		return (id: number) => book.value.content[id];
	});

	function setBook(id: number) {
		book.value = openBook(id);
	}

	function modBook() {
		updateBook(book.value);
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

	function remPage(id: number) {
		book.value.content = book.value.content.filter((t) => t.id !== id);
	}

	return { book, setBook, addPage, remPage, getPage };
});

import { defineStore } from "pinia";
import { Ref, ref, watch, computed } from "vue";
import { Book } from "@/data/Book";
import storage from "@/data/Storage";
import { emptyBook } from "@/errors/emptyBook";
import { openBook } from "@/data/LibraryProvider";
import { updateBook } from "@/data/LibraryCommander";
export const useCurrentBook = defineStore("currentBook", () => {
	const book: Ref<Book> = ref(emptyBook);
	let idle: boolean = true;
	let buffer: Book;
	const getPage = computed(() => {
		return (id: number) => book.value.content[id];
	});
	const unwatch = watch(book.value.content, () => {});

	function setBook(id: number) {
		unwatch();
		book.value = openBook(id);
		watch(book.value.content, () => {
			buffer = book.value;
			if (idle == true) {
				idle = false;
				let result;
				do {
					result = updateBook(buffer);
				} while (result.modifiedBook != buffer);
				idle = true;
				console.log("idle again");
			}
		});
	}
	function addPage(type: string) {
		let bookIndex = book.value.content.length;
		let initData = "";
		if (type == "score") {
			initData = "X:1\nK:D\n";
		}

		book.value.content.push({
			id: bookIndex,
			type: type,
			name: type,
			data: initData,
			hidden: false,
		});
	}

	function hidePage(id: number) {
		book.value.content[id].hidden = !book.value.content[id].hidden;
	}

	function remPage(id: number) {
		book.value.content = book.value.content.filter((t) => t.id !== id);
	}

	return { book, setBook, addPage, remPage, getPage, hidePage };
});

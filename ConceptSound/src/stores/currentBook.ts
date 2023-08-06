import { defineStore } from "pinia";
import { Ref, ref, watch, computed } from "vue";
import { Book } from "@/data/Book";
import { Page } from "@/data/Page";
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
					console.log(book.value.content);
				} while (result.modifiedBook != buffer);
				idle = true;
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
		let page = book.value.content.find((t) => t.id == id);
		if (page != undefined) {
			page.hidden = !page.hidden;
		}
	}

	function remPage(id: number) {
		let page = book.value.content.find((t) => t.id == id);
		if (page != undefined) {
			book.value.content.splice(book.value.content.indexOf(page), 1)[0];
		}
	}

	function swapPage(from: number = 0, to: number = 0) {
		let page = book.value.content.splice(from, 1)[0];
		book.value.content.splice(to, 0, page);
	}

	return { book, setBook, addPage, remPage, getPage, hidePage, swapPage };
});

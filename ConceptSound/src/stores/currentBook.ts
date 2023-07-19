import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentBook = defineStore("currentBook", () => {
	const bookId = ref(0);
	function setBookId(id: number) {
		bookId.value = id;
	}
	return { setBookId, bookId };
});

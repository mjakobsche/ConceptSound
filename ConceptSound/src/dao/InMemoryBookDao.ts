import { Book } from "@/model/Book";
import { Cover } from "@/model/Cover";
import { BookDao } from "./BookDao";
import { Ref, ref } from "vue";
import initialLibrary from "@/data/InitialLibrary";

export class InMemoryBookDao implements BookDao {
	private library: Ref<Book[]> = ref(initialLibrary);

	findAllCovers(): Cover[] {
		let covers: Cover[] = [];
		this.library.value.forEach((book) => {
			covers.push(book.cover);
		});
		return covers;
	}

	findById(id: number): Book {
		let books: Book[] = this.library.value.filter((b) => b.cover.id == id);
		return books[0];
	}

	save(book: Book): void {
		this.library.value.push(book);
	}

	update(book: Book): void {
		let bookIndex = this.library.value.findIndex(
			(b) => (b.cover.id = book.cover.id)
		);
		this.library.value[bookIndex] = book;
	}

	delete(book: Book): void {
		this.library.value = this.library.value.filter((b) => b != book);
	}
}

import { Book } from "@/model/Book";
import { Cover } from "@/model/Cover";

export interface BookDao {
	findAllCovers(): Cover[];
	findById(id: number): Book;
	save(book: Book): void;
	update(book: Book): void;
	delete(book: Book): void;
}

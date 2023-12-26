import {Book} from "@/model/Book";
import {Page} from "@/model/Page";
const book: Book = new Book(0, "Scherzo");
book.pages.push(new Page(0, "Text"));
export const initialLibrary: Book[] = [book];

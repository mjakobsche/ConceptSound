import {BookCover} from "@/model/BookCover";
import {BookPage} from "@/model/BookPage";
const book: BookCover = new BookCover("Scherzo");
const bookPages: BookPage = new BookPage(0, "Text")
export const initialLibrary: BookCover[] = [book];

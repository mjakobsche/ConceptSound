import {BookCover} from "@/model/BookCover";

export class BookCoverFilter {
    titlePart: string;
    tags: string[];

    public constructor() {
        this.titlePart = "";
        this.tags = [];
    }

    public matchesFilter(bookCover: BookCover): boolean {
        return bookCover.title.toLowerCase().indexOf(this.titlePart) != -1 && this.tags.every((tag) => bookCover.tags.includes(tag));
    }
}
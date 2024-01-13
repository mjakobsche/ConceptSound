export class Index {
    bookId: string;
    pagesId: string[];

    public constructor(bookId: string) {
        this.bookId = bookId;
        this.pagesId = [];
    }

}
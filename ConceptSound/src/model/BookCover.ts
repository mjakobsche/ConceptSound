export class BookCover {
    id: string;
    title: string;
    tags: string[];
    modificationDate: Date;

    public constructor(title: string) {
        const date: Date = new Date();
        this.id = date.toTimeString()
        this.title = title;
        this.tags = [];
        this.modificationDate = date;
    }
}
export class BookCover {
    id: string;
    title: string;
    tags: string[];
    image: string;
    lastUsed: Date;

    public constructor(title: string) {
        const date: Date = new Date();
        this.id = date.getTime().toString();
        this.title = title;
        this.tags = [];
        this.image = "";
        this.lastUsed = date;
    }
}
export class BookCover {
    id: string;
    title: string;
    modificationDate: Date;

    public constructor(title: string){
        const date: Date = new Date();
        this.id = date.toTimeString()
        this.title = title;
        this.modificationDate = date;
    }
}
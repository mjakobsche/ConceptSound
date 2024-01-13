import {Entity} from "@/model/Entity";

export class Book implements Entity {
    id: string;
    title: string;
    tags: string[];
    cover: string;
    modificationDate: Date;

    public constructor(title: string) {
        const date: Date = new Date();
        this.id = date.getTime().toString();
        this.title = title;
        this.tags = [];
        this.cover = "";
        this.modificationDate = date;
    }
}
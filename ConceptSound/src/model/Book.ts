import {Page} from "@/model/Page";

export class Book {
	id: number;
	title: string;
	modificationDate: Date;
	pages: Array<Page>;

	public constructor(id: number, title: string) {
		this.id = id;
		this.title = title;
		this.modificationDate = new Date();
		this.pages = [];
	}
}
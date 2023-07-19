import { Page } from "./Page";
export type Book = {
	id: number;
	name: string;
	date: Date;
	content: Page[];
};

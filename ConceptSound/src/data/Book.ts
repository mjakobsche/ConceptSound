import { Page } from "./Page";
export type Book = {
	id: number;
	title: string;
	date: Date;
	content: Page[];
};

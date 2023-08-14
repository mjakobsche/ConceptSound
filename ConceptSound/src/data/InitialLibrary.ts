import { Book } from "../model/Book";
import { Cover } from "@/model/Cover";
import { Page } from "@/model/Page";

let covers: Cover[] = [
	{ id: 0, title: "Poradnik", date: new Date() },
	{ id: 1, title: "Scherzo", date: new Date() },
];

let pages: Page[] = [
	{
		id: 0,
		type: "Text",
		name: "Text",
		data: "hej, hej, hej sokoły \n omijajcie góry lasy doły",
		hidden: false,
	},
	{
		id: 1,
		type: "Text",
		name: "Text",
		data: "dzwoń, dzwoń, dzwoń dzwoneczku \n mój stepowy, dzwoń, dzwoń, dzwoń",
		hidden: false,
	},
];

let initialLibrary: Book[] = [
	{
		cover: covers[0],
		pages: pages,
	},
	{
		cover: covers[1],
		pages: [],
	},
];

export default initialLibrary;

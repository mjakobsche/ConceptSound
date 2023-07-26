import { Book } from "./Book";
import { Ref, ref } from "vue";
let storage: Book[] = [
	{
		id: 0,
		title: "Poradnik",
		date: new Date(),
		content: [{ id: 0, type: "Text", name: "Text", data: "", hidden: false }],
	},
	{ id: 1, title: "Odes to Belobog", date: new Date(), content: [] },
	{ id: 2, title: "Scherzo", date: new Date(), content: [] },
];

export default storage;

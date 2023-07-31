import { Book } from "./Book";
import { Ref, ref } from "vue";
let storage: Book[] = [
	{
		id: 0,
		title: "Poradnik",
		date: new Date(),
		content: [
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
		],
	},
	{ id: 1, title: "Odes to Belobog", date: new Date(), content: [] },
	{ id: 2, title: "Scherzo", date: new Date(), content: [] },
];

export default storage;

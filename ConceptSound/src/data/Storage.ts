import { Ref, ref } from "vue";
import { Book } from "./Book";

let library: Ref<Book[]> = ref([
	{
		id: 0,
		title: "Poradnik",
		date: new Date(),
		content: [{ id: 0, type: "Text", name: "", data: "", hidden: false }],
	},
	{ id: 1, title: "Odes to Belobog", date: new Date(), content: [] },
	{ id: 2, title: "Scherzo", date: new Date(), content: [] },
]);

export default library;

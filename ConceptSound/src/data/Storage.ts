import { Ref, ref } from "vue";
import { Book } from "./Book";

let library: Ref<Book[]> = ref([
	{
		id: 0,
		name: "Poradnik",
		date: new Date(),
		content: [{ id: 1, type: "Text", data: "" }],
	},
	{ id: 1, name: "Odes to Belobog", date: new Date(), content: [] },
	{ id: 2, name: "Scherzo", date: new Date(), content: [] },
]);

export default library;

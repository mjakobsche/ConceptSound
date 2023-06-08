import Book from "@/model/Book";

let ListBooks: Book[] = [
	{
		name: "Four Odes to Belobog",
		altered: new Date().toISOString().substring(0, 10),
	},
	{ name: "Arasi", altered: new Date().toISOString().substring(0, 10) },
];

export default ListBooks;

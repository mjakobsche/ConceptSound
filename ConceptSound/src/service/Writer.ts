//saveBook findAllBooks findBook updateBook deleteBook

import {Book} from "@/model/Book";
import {readFile} from "@/utils/FileSystemWrapper";

async function findAllBooks(): Promise<Book[]> {
    return JSON.parse((await readFile("library/index.json")).data) as Book[];
}

export {findAllBooks}


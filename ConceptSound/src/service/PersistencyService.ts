import {deleteFile, readDirectory, readFile, writeDirectory, writeFile} from "@/utils/FileSystemWrapper";
import {BookCover} from "@/model/BookCover";
import {BookPage} from "@/model/BookPage";


async function persistBookPagesChanges(bookId: string, bookPages: BookPage[]): Promise<void> {
    await writeFile("library/" + bookId + ".json", JSON.stringify(bookPages));
}

async function persistBooksChanges(bookCovers: BookCover[]): Promise<void> {
    await writeFile("library/index.json", JSON.stringify(bookCovers));
    await assurePagesFilesIntegrity(bookCovers);
}

async function getPersistedBookPages(bookId: string): Promise<BookPage[]> {
    return await readFileContents("library/" + bookId + ".json") as BookPage[];
}

async function getPersistedBooks(): Promise<BookCover[]> {
    let bookCovers: BookCover[];
    await initializeFileSystem();
    bookCovers = await readFileContents("library/index.json");
    return bookCovers;
}

async function assurePagesFilesIntegrity(bookCovers: BookCover[]): Promise<void> {
    const coversId: String[] = bookCovers.map((bookCover) => bookCover.id);
    const pagesFiles: String[] = await readDirectoryFiles("library")
    coversId.filter((coverId) => !pagesFiles.includes(coverId + ".json")).forEach((coverId) => writeFile("library/" + coverId + ".json", "[]"));
    pagesFiles.map((pagesFile) => pagesFile.substring(0, pagesFile.length - 5)).filter((pagesFile) => !coversId.includes(pagesFile) && pagesFile !== "index").forEach((pagesFile) => deleteFile("library/" + pagesFile + ".json"));
}

async function initializeFileSystem() {
    let files = await readDirectoryFiles("")
    if (!files.includes("library")) {
        await writeDirectory("library");
    }
    files = await readDirectoryFiles("library")
    if (!files.includes("index.json")) {
        await writeFile("library/index.json", "[]");
    }
}

async function readDirectoryFiles(directory: string): Promise<string[]> {
    return (await readDirectory(directory)).files.map((file) => file.name);
}

async function readFileContents(filePath: string): Promise<any> {
    return JSON.parse((await readFile(filePath)).data);
}

export {getPersistedBooks, persistBooksChanges, persistBookPagesChanges, getPersistedBookPages}
import {deleteFile, readDirectory, readFile, writeDirectory, writeFile} from "@/utils/FileSystemWrapper";
import {BookCover} from "@/model/BookCover";
import {BookPage} from "@/model/BookPage";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {Drivers, Storage} from "@ionic/storage";

const store = new Storage({
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});

async function persistBookPagesChanges(bookId: string, bookPages: BookPage[]): Promise<void> {
    await store.set(bookId, JSON.stringify(bookPages));
}

async function persistBooksChanges(bookCovers: BookCover[]): Promise<void> {
    await store.set("index", JSON.stringify(bookCovers))
}

async function getPersistedBookPages(bookId: string): Promise<BookPage[]> {
    const bookPages = await store.get(bookId);
    return bookPages ? JSON.parse(bookPages) : [];
}

async function getPersistedBooks(): Promise<BookCover[]> {
    await store.create();
    const index = await store.get("index");
    return index ? JSON.parse(index) : [];
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
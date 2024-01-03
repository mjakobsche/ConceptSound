import {deleteFile, readDirectory, readFile, writeDirectory, writeFile} from "@/utils/FileSystemWrapper";
import {BookCover} from "@/model/BookCover";
import {FileInfo} from "@capacitor/filesystem";
import {BookPage} from "@/model/BookPage";

const fileDirectory: string = "library";
const indexFile: string = "index";
const fileExtension: string = ".json";

async function persistBookPagesChanges(bookId: string, bookPages: BookPage[]): Promise<void> {
    await writeFile(getFilePath(bookId), JSON.stringify(bookPages));
}

async function persistBooksChanges(bookCovers: BookCover[]): Promise<void> {
    await writeFile(getFilePath(indexFile), JSON.stringify(bookCovers));
    await assurePagesFilesIntegrity(bookCovers);
}

async function getPersistedBookPages(bookId: string): Promise<BookPage[]> {
    return await readFileContents(bookId) as BookPage[];
}

async function getPersistedBooks(): Promise<BookCover[]> {
    let bookCovers: BookCover[];
    await initializeFileSystem();
    bookCovers = await readFileContents(indexFile);
    return bookCovers;
}

async function assurePagesFilesIntegrity(bookCovers: BookCover[]): Promise<void> {
    const coversId: String[] = bookCovers.map((bookCover) => bookCover.id);
    const pagesFiles: String[] = (await readBaseDirectory()).map((file) => file.name);
    coversId.filter((coverId) => !pagesFiles.includes(coverId + fileExtension)).forEach((coverId) => writeFile(getFilePath(coverId), "[]"));
    pagesFiles.map((pagesFile) => pagesFile.substring(0, pagesFile.length - 5)).filter((pagesFile) => !coversId.includes(pagesFile) && pagesFile !== indexFile).forEach((pagesFile) => deleteFile(getFilePath(pagesFile)));
}

async function initializeFileSystem() {
    let files = (await readDirectory("")).files.map((file) => file.name)
    if (!files.includes(fileDirectory)) {
        await writeDirectory(fileDirectory);
    }
    files = (await readBaseDirectory()).map((file) => file.name)
    if (!files.includes(indexFile + fileExtension)) {
        await writeFile(getFilePath(indexFile), "[]");
    }
}

async function readBaseDirectory(): Promise<FileInfo[]> {
    return (await readDirectory(fileDirectory)).files;
}

async function readFileContents(fileName: string): Promise<any> {
    return JSON.parse((await readFile(getFilePath(fileName))).data);
}

function getFilePath(fileName: string) {
    return fileDirectory + "/" + fileName + fileExtension;
}

export {getPersistedBooks, persistBooksChanges, persistBookPagesChanges, getPersistedBookPages}
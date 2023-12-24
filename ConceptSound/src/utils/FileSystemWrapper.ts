import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import inMemoryData from "@/data/InMemoryData";

const encoding = Encoding.UTF8;
const baseDirectory = Directory.Documents;

async function readDirectory(directoryPath: string) {
    return await Filesystem.readdir({
        path: directoryPath,
        directory: baseDirectory,
    })
}

async function writeDirectory(directoryPath: string) {
    await Filesystem.mkdir({
        path: directoryPath,
        directory: baseDirectory,
        recursive: false,
    })
}

async function readFile (filePath: string){
    return await Filesystem.readFile({
        path: filePath,
        directory: baseDirectory,
        encoding: encoding,
    });
}

async function writeFile (filePath: string, fileContents: string) {
    await Filesystem.writeFile({
        path: filePath,
        data: fileContents,
        directory: baseDirectory,
        encoding: encoding,
    });
}

async function deleteFile(filePath: string) {
    await Filesystem.deleteFile({
        path: filePath,
        directory: baseDirectory,
    });
}

export {writeDirectory, readDirectory, writeFile, readFile, deleteFile}
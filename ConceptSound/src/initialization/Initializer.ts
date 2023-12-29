import {readDirectory, writeDirectory, writeFile} from "@/utils/FileSystemWrapper";
import {initialLibrary} from "@/initialization/InitialLibrary";
import {fileDirectory, getFilePath} from "@/utils/LibraryFilesHelper";
import {assurePagesFilesIntegrity} from "@/service/Writer";

export async function initialize() {
    if(await setupRequired()){
        await initializeDirectory();
        await initializeLibrary();
    }
}

async function setupRequired(){
    const baseDirectory = await readDirectory("");
    return baseDirectory.files.filter((file) => file.name == fileDirectory).length == 0;
}

async function initializeDirectory() {
    await writeDirectory(fileDirectory);
}

async function initializeLibrary() {
    await writeFile(getFilePath("index"), JSON.stringify(initialLibrary))
}

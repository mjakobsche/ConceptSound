import {readDirectory, writeDirectory, writeFile} from "@/utils/FileSystemWrapper";
import {initialLibrary} from "@/initialization/InitialLibrary";

const fileDirectory = "library";
const fileExtension = ".json";

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

function getFilePath(fileName: string){
    return fileDirectory + "/" + fileName + fileExtension;
}

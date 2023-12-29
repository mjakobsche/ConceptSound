export const fileDirectory = "library";
export const fileExtension = ".json";

export function getFilePath(fileName: string){
    return fileDirectory + "/" + fileName + fileExtension;
}

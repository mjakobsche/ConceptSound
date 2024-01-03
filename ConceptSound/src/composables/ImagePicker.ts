import {FilePicker} from "@capawesome/capacitor-file-picker";

export async function getImageFromFilePicker() {
    let picture: string = "";
    try{
        const result = await FilePicker.pickImages({
            multiple: false,
            readData: true
        });
        picture = "data:" + result.files[0].mimeType + ";base64," + result.files[0].data;
    } catch (e) {
        console.log("image picking cancelled")
    }
    return picture;
}

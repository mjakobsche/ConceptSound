import {Entity} from "@/model/Entity";

export class Page implements Entity {
    id: string;
    type: string;
    name: string;
    data: string;
    hidden: boolean;

    public constructor(type: string) {
        this.id = new Date().getTime().toString();
        this.type = type;
        this.name = this.getDefaultName(type);
        this.data = this.getInitialData(type);
        this.hidden = true;
    }

    private getInitialData(type: string) {
        return type === "Score" ? "X:1\nK:C\n|]" : "";
    }

    private getDefaultName(type: string) {
        let name;
        switch (type) {
            case "Text":
                name = "Tekst";
                break;
            case "Score":
                name = "Nuty";
                break;
            case "Audio":
                name = "Nagranie";
                break;
            case "Photo":
                name = "Zdjęcie";
                break;
        }
        return name;
    }
}

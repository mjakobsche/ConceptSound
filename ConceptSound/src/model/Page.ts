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
        this.name = "";
        this.data = this.getInitialData(type);
        this.hidden = false;
    }

    private getInitialData(type: string) {
        return type === "Score" ? "X:1\nK:C\n|]" : "";
    }
}

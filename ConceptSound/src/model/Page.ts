import {Entity} from "@/model/Entity";

export class Page implements Entity {
    id: string;
    type: string;
    name: string;
    content: string;
    isVisible: boolean;

    public constructor(type: string) {
        this.id = new Date().getTime().toString();
        this.type = type;
        this.name = "";
        this.content = this.getInitialData(type);
        this.isVisible = true;
    }

    private getInitialData(type: string) {
        return type === "score" ? "X:1\nK:C\n|]" : "";
    }
}

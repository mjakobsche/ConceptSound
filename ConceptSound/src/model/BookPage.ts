export class BookPage {
    id: string;
    type: string;
    name: string;
    data: string;
    hidden: boolean;

    public constructor(type: string) {
        this.id = new Date().getTime().toString();
        this.type = type;
        this.name = type;
        this.data = this.getInitialData(type);
        this.hidden = false;
    }

    private getInitialData(type: string) {
        return type === "Score" ? "X:1\nK:C\nM:7/8\n|" : "";
    }
}

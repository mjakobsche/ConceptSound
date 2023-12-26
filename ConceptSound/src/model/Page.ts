export class Page {
	id: number;
	type: string;
	name: string;
	data: string;
	hidden: boolean;

	public constructor(id: number, type: string) {
		this.id = id;
		this.type = type;
		this.name = type;
		this.data = this.getInitialData(type);
		this.hidden = false;
	}

	private getInitialData(type: string){
		return type === "Score" ? "X:1\nK:C\n|" : "";
	}
}

export class BookPage {
	id: string;
	position: number;
	type: string;
	name: string;
	data: string;
	hidden: boolean;

	public constructor(position: number, type: string) {
		this.id = new Date().toTimeString();
		this.position = position;
		this.type = type;
		this.name = type;
		this.data = this.getInitialData(type);
		this.hidden = false;
	}

	private getInitialData(type: string){
		return type === "Score" ? "X:1\nK:C\n|" : "";
	}
}

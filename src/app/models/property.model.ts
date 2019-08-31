export class Property {
    id: string;
    createdAat: string;

    constructor(
        public caption: string,
        public category: string,
        public imageUrl: string,
        public description: string,
        prix: number ) {
        this.id = new Date().getTime().toString();
        this.createdAat = this.formaDate(new Date());
    }

    formaDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }
}

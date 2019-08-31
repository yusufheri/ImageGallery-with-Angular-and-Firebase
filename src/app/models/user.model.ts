export class User {
    id: string;
    createdAat: Date;

    constructor(
        public email: string,
        public password: string,
        public avatar: string
        ) {
        this.id = new Date().getTime().toString();
        this.createdAat = new Date();
    }
}

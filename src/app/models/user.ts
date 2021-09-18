export class User{
    constructor(
        private _id: string,
        private name: string,
        private surname: string,
        private email: string,
        private password: string,
        private role: string,
        private image: string
    ){}
}
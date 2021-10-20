export class Forbiden extends Error{
    constructor(data){
        super('Forbiden')
        this.status = 403;
        this.data = data;
        this.name="Forbiden";
    }
}
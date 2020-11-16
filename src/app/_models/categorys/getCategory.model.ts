export class GetCategory {
    public _id: string;
    public categoryName: string;
    public room: string;

    constructor(_id: string, categoryName: string, room: string){
        this._id = _id;
        this.categoryName = categoryName;
        this.room = room;
    }
}
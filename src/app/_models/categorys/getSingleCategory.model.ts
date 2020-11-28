export class GetSingleCategoryModel {
    _id: string;
    categoryName: string;
    room: string;

    constructor(_id: string, categoryName: string, room: string) {
        this._id = _id;
        this.categoryName = categoryName;
        this.room = room;
    }
}
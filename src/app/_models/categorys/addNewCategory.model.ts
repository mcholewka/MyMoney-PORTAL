export class AddNewCategoryModel {
    categoryName: string;
    room: string;

    constructor(categoryName: string, room: string) {
        this.categoryName = categoryName;
        this.room = room;
    }
}

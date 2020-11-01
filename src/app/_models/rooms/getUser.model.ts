export class GetUserModel {
    rooms: string[];
    _id: string;
    email: string;
    displayName: string;

    constructor(rooms: string[], _id: string, email: string, displayName: string) {
        this.rooms = rooms;
        this._id = _id;
        this.email = email;
        this.displayName = displayName;
    }
}
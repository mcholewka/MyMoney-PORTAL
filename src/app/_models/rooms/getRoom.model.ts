export class GetRoom {
    public users: string[];
    public _id: string;
    public roomName: string;

    constructor(users: string[], _id: string, roomName: string){
        this.users = users;
        this._id = _id;
        this.roomName = roomName;
    };
}
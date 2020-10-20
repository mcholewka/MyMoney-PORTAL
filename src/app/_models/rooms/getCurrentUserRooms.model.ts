import {GetRoom} from "./getRoom.model";

export class GetCurrentUserRooms {
    public rooms: GetRoom[];

    constructor(rooms: GetRoom[]) {
        this.rooms = rooms;
    }
}
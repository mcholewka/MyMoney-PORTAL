import {GetUserModel} from "./getUser.model";

export class GetUserListModel {
    userList: GetUserModel[];

    constructor(userList: GetUserModel[]) {
        this.userList = userList;
    }
}
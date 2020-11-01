import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {GetCurrentUserRooms} from "../../_models/rooms/getCurrentUserRooms.model";
import {AddRoomModel} from "../../_models/rooms/addRoom.model";
import {GetRoom} from "../../_models/rooms/getRoom.model";
import {GetUserListModel} from "../../_models/rooms/getUserList.model";
import { GetUserModel } from '../../_models/rooms/getUser.model';

const baseURL = "api/rooms";

@Injectable({ providedIn: 'root' })

export class RoomService {
    
    constructor(private http: HttpClient) { }

    public getCurrentUserRooms<GetCurrentUserRooms>(){
        var url = environment.baseBackendUrl + baseURL;
        return this.http.get<GetCurrentUserRooms>(url);
    }

    public addRoom(addRoom: AddRoomModel) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.post(url, addRoom);
    }

    public getRoom<GetRoom>(id: string) {
        var url = environment.baseBackendUrl + baseURL+"/"+id;
        return this.http.get<GetRoom>(url);
    }

    public deleteRoom(id: string) {
        var url = environment.baseBackendUrl + baseURL+"/"+id;
        return this.http.delete(url);
    }

    public getCurrentRoomUsers<GetUserModel>(id: string) {
        var url = environment.baseBackendUrl + baseURL+"/getRoomUsers/"+id;
        return this.http.get<GetUserModel[]>(url);
    }
}
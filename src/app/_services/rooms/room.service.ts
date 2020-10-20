import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {GetCurrentUserRooms} from "../../_models/rooms/getCurrentUserRooms.model";
import {AddRoomModel} from "../../_models/rooms/addRoom.model";

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
}
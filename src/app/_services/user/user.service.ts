import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserLogin} from "../../_models/user/UserLogin.model";
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {ResponseWithToken} from "../../_models/response/responseWithToken.model";
import {UserRegister} from "../../_models/user/UserRegister.model";
import {ResponseWithUserID} from "../../_models/response/responseWithUserID.model";
import {UserAddToRoomModel} from "../../_models/user/UserAddToRoom.model";

const baseURL = "api/auth";
const roomUrl = "api/rooms";

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) { }

    public loginUser(user: UserLogin ){
        var url = environment.baseBackendUrl + baseURL + "/login";
        return this.http.post<ResponseWithToken>(url, user).pipe(catchError(this.errorHandler));
    }

    public registerUser(userRegister: UserRegister){
        var url = environment.baseBackendUrl + baseURL + "/register";
        return this.http.post<ResponseWithUserID>(url, userRegister).pipe(catchError(this.errorHandler));
    }

    public addUserToRoom(userToAdd: UserAddToRoomModel, roomID: string) {
        var url = environment.baseBackendUrl + roomUrl + "/addUser/"+ roomID;
        return this.http.post(url, userToAdd).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse){
        return throwError(error.error)
    }
}
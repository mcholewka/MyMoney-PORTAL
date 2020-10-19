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

const baseURL = "api/auth";

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

    errorHandler(error: HttpErrorResponse){
        return throwError(error.error)
    }
}
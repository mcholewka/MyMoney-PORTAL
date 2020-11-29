import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {GetPieChartDataModel} from "../../_models/charts/getPieChartData.model";
import {AddRoomModel} from "../../_models/rooms/addRoom.model";
import {GetRoom} from "../../_models/rooms/getRoom.model";
import {GetUserListModel} from "../../_models/rooms/getUserList.model";
import { GetUserModel } from '../../_models/rooms/getUser.model';
import {GetPieChartDataListModel} from "../../_models/charts/getPieChartDataList.model";
import {GetBarChartDataListModel} from "../../_models/charts/getBarChartDataList.model";
const baseURL = "api/rooms";

@Injectable({ providedIn: 'root' })

export class ChartService {
    
    constructor(private http: HttpClient) { }

    public getPieChartData<GetPieChartDataListModel>(roomId: string){
        var url = environment.baseBackendUrl + baseURL + "/pieChartData/" + roomId;
        return this.http.get<GetPieChartDataListModel>(url);
    }

    public getBarChartData<GetBarChartDataListModel>(roomId: string){
        var url = environment.baseBackendUrl + baseURL + "/barChartData/" + roomId;
        return this.http.get<GetBarChartDataListModel>(url);
    }
}
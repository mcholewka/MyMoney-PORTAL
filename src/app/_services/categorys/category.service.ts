import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {GetCategoryList} from "../../_models/categorys/getCategorysList.model";
import {AddNewCategoryModel} from "../../_models/categorys/addNewCategory.model";
import {GetSingleCategoryModel} from "../../_models/categorys/getSingleCategory.model";

const baseURL = "api/categorys";

@Injectable({ providedIn: 'root' })

export class CategoryService {
    constructor(private http: HttpClient) { }

    public getCategorysBelongsToRoom<GetCategoryList>(id: string) {
        var url = environment.baseBackendUrl + baseURL+"/"+id;
        return this.http.get<GetCategoryList>(url);
    }

    public addNewCategory(addCategory: AddNewCategoryModel) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.post(url, addCategory);
    }

    public getSingleCategory<GetSingleCategoryModel>(categoryId: string) {
        var url = environment.baseBackendUrl + baseURL+"/getSingleCategory/" +categoryId;
        return this.http.get<GetSingleCategoryModel>(url);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {AddTransactionModel} from "../../_models/transaction/addTransaction.model";

const baseURL = "api/transactions";

@Injectable({ providedIn: 'root' })

export class TransactionService {
    
    constructor(private http: HttpClient) { }


    public addNewTransaction(addTransaction: AddTransactionModel) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.post(url, addTransaction);
    }

}
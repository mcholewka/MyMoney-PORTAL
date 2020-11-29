import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import {AddTransactionModel} from "../../_models/transaction/addTransaction.model";
import {GetTransactionListModel} from "../../_models/transaction/getTransactionList.model";

const baseURL = "api/transactions";

@Injectable({ providedIn: 'root' })

export class TransactionService {
    
    constructor(private http: HttpClient) { }


    public addNewTransaction(addTransaction: AddTransactionModel) {
        var url = environment.baseBackendUrl + baseURL;
        return this.http.post(url, addTransaction);
    }

    public getTransactionList<AddTransactionModel>(roomID: string) {
        var url = environment.baseBackendUrl + baseURL + "/" + roomID;
        return this.http.get<AddTransactionModel[]>(url);
    }

    public getFilteredTransactionList<AddTransactionModel>(roomID: string, expense: Boolean, income: Boolean, startDate: Date, endDate: Date) {
        var url = environment.baseBackendUrl + baseURL + "/filteredTransactions/" + roomID + "?expense="+ expense + "&income=" + income + "&startDate=" + startDate + "&endDate=" + endDate;
        console.log(url);
        return this.http.get<AddTransactionModel[]>(url);
    }

    public deleteTransaction(transactionID: string) {
        var url = environment.baseBackendUrl + baseURL + "/" + transactionID;
        return this.http.delete(url);
    }

}
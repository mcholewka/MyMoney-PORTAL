import {AddTransactionModel} from "./addTransaction.model";

export class GetTransactionListModel {
    transactionList: AddTransactionModel[];

    constructor(transactionList: AddTransactionModel[]) {
        this.transactionList = transactionList;
    }
}
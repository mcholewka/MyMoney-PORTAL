
export class AddTransactionModel {
    transactionName: string;
    transactionDescription: string;
    transactionValue: Number;
    transactionDate: Date;
    category: string;
    room: string;
    income: Boolean;

    constructor(transactionName: string, transactionDescription: string, transactionValue: Number, transactionDate: Date, category: string, room: string, income: Boolean) {
        this.transactionName = transactionName;
        this.transactionDescription = transactionDescription;
        this.transactionValue = transactionValue;
        this.transactionDate = transactionDate;
        this.category = category;
        this.room = room;
        this.income = income;
    }
}
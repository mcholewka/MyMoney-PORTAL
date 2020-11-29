export class GetBarChartDataModel {
    _id: number;
    totalIncome: number;
    totalExpense: number;

    constructor(_id: number, totalIncome: number, totalExpense: number) {
        this._id = _id;
        this.totalExpense = totalExpense;
        this.totalIncome = totalIncome;
    }
}
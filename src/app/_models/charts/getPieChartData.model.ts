export class GetPieChartDataModel {
    _id: string;
    total: number;
    categoryName: string;
    
    constructor(_id: string, total: number) {
        this._id = _id;
        this.total = total;
    }
}
import {GetPieChartDataModel} from "./getPieChartData.model";

export class GetPieChartDataListModel {
    dataList: GetPieChartDataModel[];

    constructor(dataList: GetPieChartDataModel[]) {
        this.dataList = dataList;
    }
}
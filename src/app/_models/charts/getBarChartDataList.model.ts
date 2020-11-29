import {GetBarChartDataModel} from "./getBarChartData.model";

export class GetBarChartDataListModel {
    dataList: GetBarChartDataModel[];

    constructor(dataList: GetBarChartDataModel[]) {
        this.dataList = dataList;
    }
}
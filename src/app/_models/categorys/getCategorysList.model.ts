import {GetCategory} from "./getCategory.model";

export class GetCategoryList {
    public categoryList: GetCategory;
    
    constructor(categoryList: GetCategory) {
        this.categoryList = categoryList;
    }
}
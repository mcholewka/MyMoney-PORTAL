import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CategoryService} from '../../../../_services/categorys/category.service';
import {AddNewCategoryModel} from "../../../../_models/categorys/addNewCategory.model";

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  newCategoryName: string;

  constructor(public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewCategory() {
    this.categoryService.addNewCategory(new AddNewCategoryModel(this.newCategoryName, this.data.roomID)).subscribe(responseData => {
      console.log(responseData);
    })
  }
}

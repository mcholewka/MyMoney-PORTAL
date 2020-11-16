import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import {CategoryService} from '../../../../_services/categorys/category.service';
import {GetCategoryList} from "../../../../_models/categorys/getCategorysList.model";
import {AddNewCategoryModel} from "../../../../_models/categorys/addNewCategory.model";
import { MatDialog } from '@angular/material/dialog';
import {AddCategoryDialogComponent} from "../add-category-dialog/add-category-dialog.component";

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.css']
})
export class AddExpenseDialogComponent implements OnInit {

  newExpenseTitle: string;
  newExpenseDescription: string;
  newExpenseCategoryID: string;
  newExpenseValue: Number;
  categoryList: GetCategoryList;

  constructor(public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string, @Inject(MAT_DIALOG_DATA) public data: any, public categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.roomID)
    this.getCategoryList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategoryList() {
    this.categoryService.getCategorysBelongsToRoom<GetCategoryList>(this.data.roomID).subscribe(responseData=> {
      this.categoryList = responseData;
      console.log(this.categoryList);
    })
  }

  addNewCategory() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: {
        roomID: this.data.roomID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getCategoryList();  
        
      }
    });
  }

}

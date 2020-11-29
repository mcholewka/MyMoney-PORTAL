import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user/user.service';
import {RoomService} from "../../_services/rooms/room.service";
import {GetCurrentUserRooms} from "../../_models/rooms/getCurrentUserRooms.model";
import {AddRoomModel} from "../../_models/rooms/addRoom.model";
import {GetRoom} from "../../_models/rooms/getRoom.model";
import jwt_decode from "jwt-decode";
import {ActivatedRoute, Event} from '@angular/router';
import { browser } from 'protractor';
import { MatDialog } from '@angular/material/dialog';
import {DeleteRoomDialogComponent} from "../room/dialogs/delete-room-dialog/delete-room-dialog.component";
import {GetUserListModel} from "../../_models/rooms/getUserList.model";
import { MatTableDataSource } from '@angular/material/table';
import {GetUserModel} from "../../_models/rooms/getUser.model";
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { UserAddToRoomModel } from 'src/app/_models/user/UserAddToRoom.model';
import {CategoryService} from "../../_services/categorys/category.service";
import {AddExpenseDialogComponent} from './dialogs/add-expense-dialog/add-expense-dialog.component';
import {TransactionService} from "../../_services/transactions/transaction.service";
import {GetTransactionListModel} from "../../_models/transaction/getTransactionList.model";
import {AddTransactionModel} from "../../_models/transaction/addTransaction.model";
import {GetSingleCategoryModel} from "../../_models/categorys/getSingleCategory.model";
import {GetCategory} from "../../_models/categorys/getCategory.model";
import {GetCategoryList} from "../../_models/categorys/getCategorysList.model";
import {ChartService} from "../../_services/charts/chart.service";
import {GetPieChartDataModel} from "../../_models/charts/getPieChartData.model";
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {GetPieChartDataListModel} from "../../_models/charts/getPieChartDataList.model";
import {GetBarChartDataModel} from "../../_models/charts/getBarChartData.model";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  displayName: string;
  roomList: GetCurrentUserRooms;
  newRoomName: string;
  currentRoom: GetRoom;
  currentID: string;
  currentRoomName: string;
  userList: GetUserModel[];
  
  displayedColumns: string[] = ['displayName', 'options'];
  dataSource: MatTableDataSource<GetUserModel>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length:number;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  newUserEmail: string;

  transactionList: AddTransactionModel[];
  transactionsDisplayedColumns: string[] = ['arrow','transactionName', 'transactionDescription', 'transactionValue', 'transactionDate', 'category', 'options'];
  transactionsDataSource: MatTableDataSource<AddTransactionModel>;

  startDate: Date;
  endDate: Date;
  expenseCheckbox: Boolean;
  incomeCheckbox: Boolean;
  filterCategory: GetCategory;
  categoryList: GetCategoryList;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(26, 34, 123, 0.1)', 'rgba(156, 109, 255, 0)', 'rgba(19, 51, 224, 0.7)', 'rgba(181, 37, 89, 1)'],
    },
  ];


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Przychody' },
    { data: [], label: 'Wydatki' }
  ];


  pieChart: GetPieChartDataModel[];
  barChart: GetBarChartDataModel[];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, public userService: UserService, public roomService: RoomService, 
    public dialog: MatDialog, public categoryService: CategoryService, public transactionService: TransactionService, public chartService: ChartService) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentID = this.activatedRoute.snapshot.paramMap.get('id');
        this.getRoom(this.currentID);
        this.getUsers();
        this.getTransactionsList();
        this.getPieChartData();
        this.getBarChartData();
      }
      
    });
  }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayName;
    this.getRoomList();
    this.currentID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRoom(this.currentID);
    this.getTransactionsList();
    this.expenseCheckbox = true;
    this.incomeCheckbox = true;
    this.getCategoryList();
    this.getPieChartData();
    this.getBarChartData();
  }

  getRoomList() {
    this.roomService.getCurrentUserRooms<GetCurrentUserRooms>().subscribe(data=>{
      if(data!=undefined)
      {
        this.roomList = data;
      }
      
    })
  }

  addNewRoom() {
    if(this.newRoomName.length>=3) {
      this.roomService.addRoom(new AddRoomModel(this.newRoomName)).subscribe(data=> {
        this.toastr.success('Sukces!', 'Dodałeś nową organizację!');
        this.getRoomList();
        this.newRoomName="";
      })
    }
  }

  setCurrentRoom(currentRoom: GetRoom) {
    this.currentRoom = currentRoom;
  }

  getRoom(id: string) {
    this.roomService.getRoom<GetRoom>(id).subscribe(data=> {
      this.currentRoomName = data.roomName;
    })
  }

  deleteRoom() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteRoomDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
          this.roomService.deleteRoom(this.currentID).subscribe(data=> {
          this.toastr.info('Usunięto pokój!');
          this.getRoomList();
          this.router.navigate(["/main"]);
        })
      }
    });
  }

  getUsers() {
    this.roomService.getCurrentRoomUsers<GetUserModel>(this.currentID).subscribe(data=> {
      this.userList = data;
      this.dataSource = new MatTableDataSource<GetUserModel>(this.userList);
    });
  }

  addNewUser() {
    this.userService.addUserToRoom(new UserAddToRoomModel(this.newUserEmail), this.currentID).subscribe(data=>{
      this.getUsers();
      this.toastr.success('Sukces!', 'Dodałeś nowego użytkownika do pokoju!');
    });
  }

  deleteUserFromRoom(id: string) {
    this.roomService.deleteUserFromRoom(id, this.currentID).subscribe(data=> {
      this.getUsers();
      this.toastr.info("Pomyślnie usunięto użytkownika z pokoju", "Informacja!");
    });
  }

  addNewExpense() {
    this.openAddExpenseDialog(false);
  }

  openAddExpenseDialog(isIncome: Boolean): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '500px',
      data: {
        roomID: this.currentID,
        isIncome: isIncome
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getFilteredTransactionList();
    });
  }

  addNewIncome() {
    this.openAddExpenseDialog(true);
  }

  getTransactionsList() {
    this.transactionService.getTransactionList<AddTransactionModel>(this.currentID).subscribe(responseData => {
      this.transactionList = responseData;

      this.transactionList.forEach(element => {
        this.categoryService.getSingleCategory<GetSingleCategoryModel>(element.category).subscribe(responseData=> {
          element.categoryName = responseData.categoryName;
        })
      });

      this.transactionsDataSource = new MatTableDataSource<AddTransactionModel>(this.transactionList);
    });
  }

  getFilteredTransactionList() {
    this.transactionService.getFilteredTransactionList<AddTransactionModel>(this.currentID, this.expenseCheckbox, this.incomeCheckbox, this.startDate, this.endDate).subscribe(responseData=> {
      this.transactionList = responseData;
      if(this.transactionList!=null) {
        this.transactionList.forEach(element => {
          this.categoryService.getSingleCategory<GetSingleCategoryModel>(element.category).subscribe(responseData=> {
            element.categoryName = responseData.categoryName;
          })
        });
      }
      
      this.transactionsDataSource = new MatTableDataSource<AddTransactionModel>(this.transactionList);
    })
  }
  
  refreshTable() {
    console.log("refreshing");
    this.getFilteredTransactionList();
  }

  getCategoryList() {
    this.categoryService.getCategorysBelongsToRoom<GetCategoryList>(this.currentID).subscribe(responseData=> {
      this.categoryList = responseData;
    })
  }

  getPieChartData() {
    this.chartService.getPieChartData<GetPieChartDataModel[]>(this.currentID).subscribe(responseData => {
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.pieChart = responseData;
      this.pieChart.forEach(element => {
        this.categoryService.getSingleCategory<GetSingleCategoryModel>(element._id).subscribe(responseData=> {
          element.categoryName = responseData.categoryName;
          this.pieChartLabels.push(element.categoryName);
          this.pieChartData.push(element.total);
        })
      });
    })
  }

  getBarChartData() {
    this.chartService.getBarChartData<GetBarChartDataModel[]>(this.currentID).subscribe(responseData => {
      this.barChartLabels = [];
      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChart = responseData;
      this.barChart.forEach(element => {
        this.barChartLabels.push(this.months[element._id-1]);
        this.barChartData[0].data.push(element.totalExpense);
        this.barChartData[1].data.push(element.totalIncome);
      });
    });
  }

  deleteTransaction(transactionID: string) {
    this.transactionService.deleteTransaction(transactionID).subscribe(responseData => {
      this.toastr.info('Usunięto tranzakcje!');
      this.getTransactionsList();
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

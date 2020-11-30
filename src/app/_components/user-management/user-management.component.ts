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
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

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


  constructor(public router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, public userService: UserService, public roomService: RoomService, 
    public dialog: MatDialog, public categoryService: CategoryService, public transactionService: TransactionService, public chartService: ChartService) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentID = this.activatedRoute.snapshot.paramMap.get('id');
        this.getRoom(this.currentID);
        this.getUsers();
      }
      
    });
  }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayName;
    this.getRoomList();
    this.currentID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRoom(this.currentID);
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

  userManagement() {
    
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

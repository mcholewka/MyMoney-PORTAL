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


  constructor(public router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, public userService: UserService, public roomService: RoomService, public dialog: MatDialog) { 
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
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

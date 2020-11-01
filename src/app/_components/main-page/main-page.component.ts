import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user/user.service';
import jwt_decode from "jwt-decode";
import {RoomService} from "../../_services/rooms/room.service";
import {GetCurrentUserRooms} from "../../_models/rooms/getCurrentUserRooms.model";
import {AddRoomModel} from "../../_models/rooms/addRoom.model";
import {GetRoom} from "../../_models/rooms/getRoom.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayName: string;
  roomList: GetCurrentUserRooms;
  newRoomName: string;
  currentRoom: GetRoom;

  constructor(public router: Router, private toastr: ToastrService, public userService: UserService, public roomService: RoomService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayName;
    this.getRoomList();
  }

  getRoomList() {
    this.roomService.getCurrentUserRooms<GetCurrentUserRooms>().subscribe(data=>{
      // if(data!=undefined)
      // {
        this.roomList = data;
        this.currentRoom = data.rooms[0];
      //}
      
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

  

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

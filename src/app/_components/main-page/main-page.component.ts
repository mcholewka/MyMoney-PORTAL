import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayName: string;

  constructor(public router: Router, private toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayName;
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

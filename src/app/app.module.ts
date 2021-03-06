import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {MaterialModule} from './_shared/material/material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenIntercpetor } from './_shared/http/token.interceptor';
import { RoomComponent } from './_components/room/room.component';
import { DeleteRoomDialogComponent } from './_components/room/dialogs/delete-room-dialog/delete-room-dialog.component';
import { AddExpenseDialogComponent } from './_components/room/dialogs/add-expense-dialog/add-expense-dialog.component';
import { AddCategoryDialogComponent } from './_components/room/dialogs/add-category-dialog/add-category-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { UserManagementComponent } from './_components/user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    RoomComponent,
    DeleteRoomDialogComponent,
    AddExpenseDialogComponent,
    AddCategoryDialogComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercpetor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { SplitButtonModule } from 'primeng/splitbutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './app/Index/Index.component';
import { BaseModuleModule } from './BaseModule.module';
import { InformationComponent } from './app/Information/Information.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChangeInforComponent } from './app/ChangeInfor/ChangeInfor.component';
import { ChangePassWordComponent } from './app/ChangePassWord/ChangePassWord.component';
import { LectureScheduleComponent } from './app/LectureSchedule/LectureSchedule.component';
import { ScheduleAllComponent } from './app/ScheduleAll/ScheduleAll.component';
import { ScheduleNotRegisteredComponent } from './app/ScheduleNotRegistered/ScheduleNotRegistered.component';
import { ScheduleRegisteredComponent } from './app/ScheduleRegistered/ScheduleRegistered.component';
import { ManagerClassComponent } from './app/ManagerClass/ManagerClass.component';
import { FilterPipe } from './pipes/FilterPipe.pipe';
import { ManagerSubjectsComponent } from './app/ManagerSubjects/ManagerSubjects.component';
import { ManagerClassRoomComponent } from './app/ManagerClassRoom/ManagerClassRoom.component';
import { ManagerAccountComponent } from './app/ManagerAccount/ManagerAccount.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InformationComponent,
        ChangeInforComponent,
        ChangePassWordComponent,
        LectureScheduleComponent,
        ScheduleAllComponent,
        ScheduleNotRegisteredComponent,
        ScheduleRegisteredComponent,
        ManagerClassComponent,
        ManagerSubjectsComponent,
        ManagerClassRoomComponent,
        ManagerAccountComponent,
        NavBarComponent,
        FilterPipe
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BaseModuleModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        CalendarModule,
        CheckboxModule,
        DialogModule,
        TableModule,
        ToggleButtonModule,
        NgxTippyModule,
        ConfirmPopupModule,
        SplitButtonModule,
        NgbDropdownModule
    ]
})
export class AppModule {}

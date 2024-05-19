import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './app/Index/Index.component';
import { BaseModuleModule } from './BaseModule.module';
import { InformationComponent } from './app/Information/Information.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChangeInforComponent } from './app/ChangeInfor/ChangeInfor.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChangePassWordComponent } from './app/ChangePassWord/ChangePassWord.component';
import { LectureScheduleComponent } from './app/LectureSchedule/LectureSchedule.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InformationComponent,
        ChangeInforComponent,
        ChangePassWordComponent,
        LectureScheduleComponent,
        NavBarComponent
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
        ToggleButtonModule
    ]
})
export class AppModule {}

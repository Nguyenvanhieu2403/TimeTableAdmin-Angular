import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authen/Login/Login.component';
import { IndexComponent } from './app/Index/Index.component';
import { InformationComponent } from './app/Information/Information.component';
import { ChangeInforComponent } from './app/ChangeInfor/ChangeInfor.component';
import { ChangePassWordComponent } from './app/ChangePassWord/ChangePassWord.component';
import { LectureScheduleComponent } from './app/LectureSchedule/LectureSchedule.component';
import { ScheduleAllComponent } from './app/ScheduleAll/ScheduleAll.component';
import { ScheduleNotRegisteredComponent } from './app/ScheduleNotRegistered/ScheduleNotRegistered.component';
import { ScheduleRegisteredComponent } from './app/ScheduleRegistered/ScheduleRegistered.component';
import { ManagerClassComponent } from './app/ManagerClass/ManagerClass.component';
import { ManagerSubjectsComponent } from './app/ManagerSubjects/ManagerSubjects.component';
import { ManagerClassRoomComponent } from './app/ManagerClassRoom/ManagerClassRoom.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: [
      {
        path: 'login', loadChildren: () => import('./authen/Login/Login.module').then(m => m.LoginModule),
      }
    ],

  },
  {   
    path: 'index', component: IndexComponent,
  },
  {   
    path: 'information', component: InformationComponent,
  },
  {
    path: 'changeInfor', component: ChangeInforComponent,
  },
  {
    path: 'changePassWord', component: ChangePassWordComponent,
  },
  {
    path: 'lectureSchedule', component: LectureScheduleComponent,
  },
  {
    path: 'ScheduleAll', component: ScheduleAllComponent,
  },
  {
    path: 'ScheduleNotRegistered', component: ScheduleNotRegisteredComponent,
  },
  {
    path: 'ScheduleRegistered', component: ScheduleRegisteredComponent,
  },
  {
    path: 'ManagerClass', component: ManagerClassComponent,
  },
  {
    path: 'ManagerSubjects', component: ManagerSubjectsComponent,
  },
  {
    path: 'ManagerClassRoom', component: ManagerClassRoomComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

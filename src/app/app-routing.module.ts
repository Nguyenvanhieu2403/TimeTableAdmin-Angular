import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authen/Login/Login.component';
import { IndexComponent } from './app/Index/Index.component';
import { InformationComponent } from './app/Information/Information.component';
import { ChangeInforComponent } from './app/ChangeInfor/ChangeInfor.component';
import { ChangePassWordComponent } from './app/ChangePassWord/ChangePassWord.component';

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
    path: '*', component: IndexComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

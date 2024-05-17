import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ChangePassWordComponent } from './app/ChangePassWord/ChangePassWord.component';

@NgModule({
  declarations: [				
    AppComponent,
    IndexComponent,
    InformationComponent,
    ChangeInforComponent,
    ChangePassWordComponent,
    NavBarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

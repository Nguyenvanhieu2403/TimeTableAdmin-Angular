import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTippyModule
  ],
  exports: [CommonModule],
  providers: [CommonModule],
  declarations: []
})
export class BaseModuleModule { }

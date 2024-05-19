import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  toShow:boolean=false;
  title = 'TimeTableAdmin';
  body: any;
  StyleInfor: any;
  click: boolean = false;

  private storageSub= new Subject<string>();

  constructor(private router: Router) { 
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  

  ngOnInit(){

    if(localStorage.getItem('login')!=null){
      this.toShow=true;
      this.body = "col-md-9"
    }
    else {
      this.toShow=false;
      this.body = "col-md-12"
    }
  }

  getInformation() {
    this.router.navigate(['/information']);
  }

  Show() {
    this.click = !this.click;
    if (this.click) {
      this.StyleInfor.style.display = "block";
    }
    else {
      this.StyleInfor.style.display = "none";
    }
  }

  Logout(){
    localStorage.removeItem("login");
    this.toShow=false;
  }  
}

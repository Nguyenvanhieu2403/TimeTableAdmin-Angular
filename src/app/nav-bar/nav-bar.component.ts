import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  toShow:boolean=false;
  title = 'TimeTableAdmin';
  body: any;
  StyleInfor: any;
  click: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('login')!=null){
      this.toShow=true;
      this.body = "col-md-6"
    }
    else {
      this.toShow=false;
      this.body = "col-md-12"
    }
  }

  getInformation() {
    this.router.navigate(['/information']);
  }

  ShowchangInfor() {
    this.router.navigate(['/changeInfor']);
  }
  ShowchangPassword() {
    this.router.navigate(['/changePassWord']);
  }

  Show() {
    this.click = !this.click;
    if (this.click) {
      this.StyleInfor= "display: block;";
    }
    else {
      this.StyleInfor= "display: none;";
    }
  }

  Logout(){
    localStorage.removeItem("login");
    this.toShow=false;
  }  

}

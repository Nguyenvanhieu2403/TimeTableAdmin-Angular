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
  imgSrc: any;
  FullName: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.imgSrc = localStorage.getItem('avata');
    this.FullName = localStorage.getItem('fullname');
      // Thực hiện các hành động khác sau khi đã reload
      if (localStorage.getItem('login') != null) {
        this.toShow = true;
        this.body = "col-md-6";
      } else {
        this.toShow = false;
        this.body = "col-md-12";
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

  ShowLectureSchedule() {
    this.router.navigate(['/lectureSchedule']);
  }

  ShowScheduleAll() {
    this.router.navigate(['/ScheduleAll']);
  }

  ScheduleNotRegistered() {
    this.router.navigate(['/ScheduleNotRegistered']);
  }

  ScheduleRegistered() {
    this.router.navigate(['/ScheduleRegistered']);
  }

  ShowManagerClass() {
    this.router.navigate(['/ManagerClass']);
  }

  ShowManagerSubjects() {
    this.router.navigate(['/ManagerSubjects']);
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

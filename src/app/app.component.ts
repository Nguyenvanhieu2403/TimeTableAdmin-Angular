import { Component,Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private renderer: Renderer2) { 
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  

  ngOnInit(){
    if(localStorage.getItem('login')!=null){
      this.toShow=true;
      this.body = "col-12 col-lg-9 col-md-12 col-sm-12 position-relative"
    }
    else {
      this.toShow=false;
      this.body = "col-md-12 p-0"
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
    localStorage.removeItem("fullname");
    localStorage.removeItem("avata");
    localStorage.removeItem("email");
    localStorage.removeItem("hasReloaded");
    localStorage.removeItem("login");
    this.router.navigate(['/login']);
    this.toShow=false;
  }  
  toggleNavbar() {
    const navbar = document.querySelector('.container_navbar');
    const leftSide = document.querySelector('.container_left_side');

    if (navbar) {
      if (navbar.classList.contains('active')) {
        this.renderer.removeClass(navbar, 'active');
      } else {
        this.renderer.addClass(navbar, 'active');
      }
    }

    if (leftSide) {
      if (leftSide.classList.contains('d-none')) {
        this.renderer.removeClass(leftSide, 'd-none');
      } else {
        this.renderer.addClass(leftSide, 'd-none');
      }
    }
  }
}

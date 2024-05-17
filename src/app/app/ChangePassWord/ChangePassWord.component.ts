import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ChangePassWord',
  templateUrl: './ChangePassWord.component.html',
  styleUrls: ['./ChangePassWord.component.css']
})
export class ChangePassWordComponent implements OnInit {

  passWordOld: any;
  passWordNew: any;
  confirmPassWord: any;

  constructor() { }

  ngOnInit() {
  }

  Save() {

  }

}

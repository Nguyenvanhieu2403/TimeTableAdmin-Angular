import { Component, OnInit } from '@angular/core';
import { ScheduleNotRegisteredService } from './ScheduleNotRegistered.service';

@Component({
  selector: 'app-ScheduleNotRegistered',
  templateUrl: './ScheduleNotRegistered.component.html',
  styleUrls: ['./ScheduleNotRegistered.component.css']
})
export class ScheduleNotRegisteredComponent implements OnInit {

  schedules!: any[];
  first = 0;
  rows = 10;

  constructor(private ScheduleNotRegisteredService : ScheduleNotRegisteredService) { }

  ngOnInit() {
    this.ScheduleNotRegisteredService.getSchedule(1,999).subscribe((res: any) => {
      this.schedules = res.result;
      let i = 1;
      this.schedules.forEach((element: any) => {
          element.NumericalOrder = i++;
      });
    });
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

}

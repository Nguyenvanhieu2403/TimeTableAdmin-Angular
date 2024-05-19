import { Component, OnInit } from '@angular/core';
import { ScheduleRegisteredService } from './ScheduleRegistered.service';

@Component({
  selector: 'app-ScheduleNotRegistered',
  templateUrl: './ScheduleRegistered.component.html',
  styleUrls: ['./ScheduleRegistered.component.css']
})
export class ScheduleRegisteredComponent implements OnInit {

  schedules!: any[];
  first = 0;
  rows = 10;

  constructor(private ScheduleRegisteredService : ScheduleRegisteredService) { }

  ngOnInit() {
    this.ScheduleRegisteredService.getSchedule(1,999).subscribe((res: any) => {
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

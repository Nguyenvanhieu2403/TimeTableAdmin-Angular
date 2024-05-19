import { Component, OnInit } from '@angular/core';
import { ScheduleAllService } from './ScheduleAll.service';

@Component({
  selector: 'app-ScheduleAll',
  templateUrl: './ScheduleAll.component.html',
  styleUrls: ['./ScheduleAll.component.css']
})
export class ScheduleAllComponent implements OnInit {

  schedules!: any[];
  first = 0;
  rows = 10;

  constructor(private ScheduleALl: ScheduleAllService) { }

  ngOnInit() {
    this.ScheduleALl.getSchedule(1,999).subscribe((res: any) => {
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

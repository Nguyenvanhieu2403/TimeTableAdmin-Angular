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
  searchText: any;

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

  ExportExcel() {
    import("xlsx").then(xlsx => {
      const json = this.schedules.map(item => ({
        "STT": item.NumericalOrder,
        "Mã học phần": item.course_Code,
        "Tên giảng viên": item.fullName,
        "Lớp học": item.lopHoc,
        "Phòng học": item.phongHoc,
        "Môn học": item.monHoc,
        "Lịch học": item.lichHocTongList
      }));
      const worksheet = xlsx.utils.json_to_sheet(json, 
        { 
          header: [
            "STT",
            "Mã học phần",
            "Tên giảng viên",
            "Lớp học",
            "Phòng học",
            "Môn học",
            "Lịch học"
          ]
        }
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Danh sách lịch học");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  filterClasses() {
    if (this.searchText) {
      this.schedules = this.schedules.filter((element: any) => {
        return element.course_Code.toLowerCase().includes(this.searchText.toLowerCase()) || element.lopHoc.toLowerCase().includes(this.searchText.toLowerCase())
        || element.monHoc.toLowerCase().includes(this.searchText.toLowerCase()) || element.phongHoc.toLowerCase().includes(this.searchText.toLowerCase())
        || element.lichHocTongList.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ManagerSubjectsService } from './ManagerSubjects.service';

@Component({
  selector: 'app-ManagerSubjects',
  templateUrl: './ManagerSubjects.component.html',
  styleUrls: ['./ManagerSubjects.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ManagerSubjectsComponent implements OnInit {

  token: any = localStorage.getItem('login');
  classes!: any[];
  first = 0;
  rows = 10;
  visible: boolean = false;
  dialogVisible: { [key: number]: boolean } = {};
  selectedClass: any;
  searchText: any;
  addClass: boolean = false;
  //Show data popup class
  courseCode: any;
  NameSubject: any;
  Credits: any;
  description: any;

  // Thêm lớp học
  addName: any;
  addCourseCode: any;
  addCredits: any;
  addDescription: any;

  constructor(private managerSubjectsService: ManagerSubjectsService, private datePipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.managerSubjectsService.getAllClass(1,999).subscribe((res: any) => {
      this.classes = res.result;
      let i = 1;
      this.classes.forEach((element: any) => {
          element.NumericalOrder = i++;
      });
    });
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ShowProfile(classId: any){
    this.dialogVisible[classId] = true;
    this.managerSubjectsService.getClassById(classId, 1, 999).subscribe((res: any) => {
      this.selectedClass = res.result[0];
      this.courseCode = this.selectedClass.course_code;
      this.NameSubject = this.selectedClass.name;
      this.Credits = this.selectedClass.credits;
      this.description = this.selectedClass.description;
    });
  }

  ShowAdd() {
    this.addClass = true;
  }

  Save(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn lưu không?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.managerSubjectsService.saveClassById(classId, this.token, {
            course_code: this.courseCode,
            name: this.NameSubject,
            credits: this.Credits,
            dateStart: "2024-05-19T15:35:15.428Z",
            dateEnd: "2024-05-19T15:35:15.428Z",
            description: this.description??"",
          }).subscribe((res: any) => {
            console.log(res);
            if(res.statusCode == 200){
              this.toastr.success ('Cập nhật môn học thành công');
              this.dialogVisible[classId] = false;
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Cập nhật môn học thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  Add(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn lưu không?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.managerSubjectsService.AddClass(this.token, {
            course_code: this.addCourseCode,
            name: this.addName,
            credits: this.addCredits,
            dateStart: "2024-05-19T15:35:15.428Z",
            dateEnd: "2024-05-19T15:35:15.428Z",
            description: this.addDescription??"",
          }).subscribe((res: any) => {
            console.log(res);
            if(res.statusCode == 200){
              this.toastr.success ('Thêm môn học thành công');
              this.dialogVisible[classId] = false;
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Thêm môn học thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  Cancel(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có muốn hủy thay đổi không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.toastr.info("Đã hủy thay đổi", "Thông báo");
            this.dialogVisible[classId] = false;
        },
        reject: () => {

        }
    });
  }

  DeleteClass(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn xóa không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.managerSubjectsService.deleteClassById(classId).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.toastr.success ('Xóa lớp học thành công');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Xóa lớp học thất bại do lớp đang được sử dụng');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  filter() {
    if (this.searchText) {
      this.classes = this.classes.filter((element: any) => {
        return element.name.toLowerCase().includes(this.searchText.toLowerCase()) || element.course_code.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  ExportExcel() {
    this.managerSubjectsService.ExportExcel().subscribe((res: any) => {
      // const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'Danh sách môn học.xlsx';
      // a.click();
      if(res.statusCode == 200){
        this.toastr.success ('Xuất file thành công');
      }
      else {
        this.toastr.error ('Xuất file thất bại');
      }
    });
  }

}

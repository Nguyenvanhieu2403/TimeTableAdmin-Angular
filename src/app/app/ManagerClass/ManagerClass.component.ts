import { Component, OnInit, model } from '@angular/core';
import { ManagerClassService } from './ManagerClass.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ManagerClass',
  templateUrl: './ManagerClass.component.html',
  styleUrls: ['./ManagerClass.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ManagerClassComponent implements OnInit {

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
  nameClass: any;
  course: any;
  year_Of_Admission: any;
  description: any;

  // Thêm lớp học
  addCourse: any;
  addNameClass: any;
  addYear_Of_Admission: any;
  addDescription: any;

  constructor(private managerClassService: ManagerClassService, private datePipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.managerClassService.getAllClass(1,999).subscribe((res: any) => {
      this.classes = res.result;
      let i = 1;
      this.classes.forEach((element: any) => {
          element.NumericalOrder = i++;
          element.year_Of_Admission = this.datePipe.transform(element.year_Of_Admission, 'dd/MM/yyyy');
          element.createDate = this.datePipe.transform(element.createDate, 'dd/MM/yyyy');
      });
    });
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ShowProfile(classId: any){
    this.dialogVisible[classId] = true;
    this.managerClassService.getClassById(classId, 1, 999).subscribe((res: any) => {
      this.selectedClass = res.result[0];
      this.nameClass = this.selectedClass.name;
      this.course = this.selectedClass.course;
      this.year_Of_Admission = this.datePipe.transform(this.selectedClass.year_Of_Admission, 'dd/MM/yyyy');
      this.description = this.selectedClass.description;
    });
  }

  ShowAddClass() {
    this.addClass = true;
  }

  private parseDate(input: string): Date | null {
    const parts = input.split('/');
    if (parts.length !== 3) return null;
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript Date bắt đầu từ 0
    const year = parseInt(parts[2], 10);
  
    return new Date(year, month, day);
  }

  Save(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn lưu không?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          const parsedDate = this.parseDate(this.year_Of_Admission);
          const formattedYearOfAdmission = parsedDate ? this.datePipe.transform(parsedDate, 'yyyy-MM-dd') : null;

          this.managerClassService.saveClassById(classId, this.token, {
            nameClass: this.nameClass,
            year_Of_Admission: formattedYearOfAdmission,
            course: this.course,
            descriptionClass: this.description,
          }).subscribe((res: any) => {
            console.log(res);
            if(res.statusCode == 200){
              this.toastr.success ('Cập nhật lớp học thành công');
              this.dialogVisible[classId] = false;
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Cập nhật lớp học thất bại');
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

          const parsedDate = this.parseDate(this.addYear_Of_Admission);
          const formattedYearOfAdmission = parsedDate ? this.datePipe.transform(parsedDate, 'yyyy-MM-dd') : null;

          this.managerClassService.AddClass(this.token, {
            nameClass: this.addNameClass,
            year_Of_Admission: this.addYear_Of_Admission,
            course: this.addCourse,
            descriptionClass: this.addDescription,
          }).subscribe((res: any) => {
            console.log(res);
            if(res.statusCode == 200){
              this.toastr.success ('Thêm lớp học thành công');
              this.dialogVisible[classId] = false;
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Thêm lớp học thất bại');
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
          this.managerClassService.deleteClassById(classId).subscribe((res: any) => {
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

  filterClasses() {
    if (this.searchText) {
      this.classes = this.classes.filter((element: any) => {
        return element.name.toLowerCase().includes(this.searchText.toLowerCase()) || element.course.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  ExportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.classes);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Danh sách lớp học");
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
  

}

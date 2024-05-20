import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagerClassRoomService } from './ManagerClassRoom.service';

@Component({
  selector: 'app-ManagerClassRoom',
  templateUrl: './ManagerClassRoom.component.html',
  styleUrls: ['./ManagerClassRoom.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ManagerClassRoomComponent implements OnInit {

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
  nameClassRoom: any;
  description: any;

  // Thêm lớp học
  addName: any;
  addDescription: any;

  constructor(private managerClassRoomService: ManagerClassRoomService, private datePipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.managerClassRoomService.getAllClassRoom(1,999).subscribe((res: any) => {
      this.classes = res.result;
      let i = 1;
      this.classes.forEach((element: any) => {
          element.NumericalOrder = i++;
          element.createDate = this.datePipe.transform(element.createDate, 'dd/MM/yyyy');
      });
    });
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ShowProfile(classId: any){
    console.log(classId);
    this.dialogVisible[classId] = true;
    this.managerClassRoomService.getClassRoomById(classId, 1, 999).subscribe((res: any) => {
      this.selectedClass = res.result[0];
      this.nameClassRoom = this.selectedClass.name;
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
          this.managerClassRoomService.saveClassRoomById(classId, this.token, {
            name: this.nameClassRoom,
            description: this.description??"",
          }).subscribe((res: any) => {
            console.log(res);
            if(res.statusCode == 200){
              this.toastr.success ('Cập nhật phòng học thành công');
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
          this.managerClassRoomService.AddClassRoom(this.token, {
            name: this.addName,
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
          this.managerClassRoomService.deleteClassRoomById(classId).subscribe((res: any) => {
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
        return element.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  ExportExcel() {
    this.managerClassRoomService.ExportExcel().subscribe((res: any) => {
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

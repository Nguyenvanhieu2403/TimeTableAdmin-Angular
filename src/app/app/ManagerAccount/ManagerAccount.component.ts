import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagerAccountService } from './ManagerAccount.service';

@Component({
  selector: 'app-ManagerAccount',
  templateUrl: './ManagerAccount.component.html',
  styleUrls: ['./ManagerAccount.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ManagerAccountComponent implements OnInit {

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
  id: any;
  firstName: any;
  lastName: any;
  dateOfBirth: any;
  email: any;
  phone: any;
  gender: any;
  avata: any;

  // Thêm lớp học
  addCourse: any;
  addNameClass: any;
  addYear_Of_Admission: any;
  addDescription: any;

  constructor(private managerClassService: ManagerAccountService, private datePipe: DatePipe, private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.managerClassService.getAllClass(1,999).subscribe((res: any) => {
      this.classes = res.result;
      let i = 1;
      this.classes.forEach((element: any) => {
          element.NumericalOrder = i++;
          element.dateOfBirth = this.datePipe.transform(element.dateOfBirth, 'dd/MM/yyyy');
      });
    });
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ShowProfile(classId: any){
    this.id = classId;
    this.dialogVisible[classId] = true;
    this.managerClassService.getClassById(classId, 1, 999).subscribe((res: any) => {
      this.selectedClass = res.result[0];
      this.firstName = this.selectedClass.firstName;
      this.lastName = this.selectedClass.lastName;
      this.dateOfBirth = this.datePipe.transform(this.selectedClass.dateOfBirth, 'dd/MM/yyyy');
      this.email = this.selectedClass.email;
      this.phone = "0"+this.selectedClass.phone;
      this.gender = (this.selectedClass.gender == 1 ? "Nam" : "Nữ");
      this.avata = this.selectedClass.avata;
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
          const parsedDate = this.parseDate(this.dateOfBirth);
          const formattedYearOfAdmission = parsedDate ? this.datePipe.transform(parsedDate, 'yyyy-MM-dd') : null;

          this.managerClassService.saveClassById(classId, this.token, {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            numberPhone: this.phone,
            gender: this.gender == "Nam" ? 1 : 0,
            dateOfBirth: formattedYearOfAdmission,
            avata: this.avata, 
            usedStated: 0,
            description: "",
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

  LockAccount(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn khóa tài khoản không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.managerClassService.lockAccount(classId,1).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.toastr.success ('Khóa tài khoản thành công');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Khóa tài khoản thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  UnLockAccount(event: Event, classId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn mở khóa tài khoản không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.managerClassService.lockAccount(classId,0).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.toastr.success ('Mở khóa tài khoản thành công');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Mở khóa tài khoản thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  LockAccountType(event: Event, TypeAccount: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn khóa tài khoản không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.managerClassService.LockAccountType(TypeAccount,1).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.toastr.success ('Khóa tài khoản thành công');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Khóa tài khoản thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

  UnLockAccountType(event: Event, TypeAccount: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn mở khóa tài khoản không?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.managerClassService.LockAccountType(TypeAccount,0).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.toastr.success ('Mở khóa tài khoản thành công');
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
            else {
              this.toastr.error ('Mở khóa tài khoản thất bại');
            }
          });
        },
        reject: () => {
            this.toastr.warning("Hành động đã bị hủy", "Hủy bỏ");
        }
    });
  }

}

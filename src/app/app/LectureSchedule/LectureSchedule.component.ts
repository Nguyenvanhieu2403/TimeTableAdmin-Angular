import { Component, OnInit } from '@angular/core';
import { LectureScheduleService } from './LectureSchedule.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';

@Component({
  selector: 'app-LectureSchedule',
  templateUrl: './LectureSchedule.component.html',
  styleUrls: ['./LectureSchedule.component.css']
})
export class LectureScheduleComponent implements OnInit {

    dateStart: any;
    dateEnd: any;
    visible: boolean = false;
    visibleClassRoom: boolean = false;
    visibleSubject: boolean = false;
    classes!: any[];
    classRoomes!: any[];
    subjectes!: any[];
    schedules!: any[];
    classesId: any[] = [];
    classRoomId: any[] = [];
    subjectsId: any[] = [];
    first = 0;
    rows = 10;

    currenDate: any


    constructor(private lectureService: LectureScheduleService, private datePipe: DatePipe, private toastr: ToastrService ) { }

    ngOnInit() {
    }

    showClass() {
        this.lectureService.getClass(1,999).subscribe((res: any) => {
            this.classes = res.result;
            let i = 1;
            this.classes.forEach((element: any) => {
                element.NumericalOrder = i++;
                element.idChoose = element.id;
                element.year_Of_Admission = this.datePipe.transform(element.year_Of_Admission, 'dd/MM/yyyy');
            });
        });
    }

    showClassRoom() {
        this.lectureService.getClassRoom(1,999).subscribe((res: any) => {
            this.classRoomes = res.result;
            let i = 1;
            this.classRoomes.forEach((element: any) => {
                element.NumericalOrder = i++;
                element.idChoose = element.id;
            });
        });
    }

    showSubject() {
        this.lectureService.getSubject(1,999).subscribe((res: any) => {
            this.subjectes = res.result;
            let i = 1;
            this.subjectes.forEach((element: any) => {
                element.NumericalOrder = i++;
                element.idChoose = element.id;
            });
        });
    }

    showDialog() {
        this.visible = true;
    }

    ShowClassRoom() {
        this.visibleClassRoom = true;
    }

    ShowSubject() {
        this.visibleSubject = true;
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event: { first: number; rows: number; }) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.classes ? this.first === this.classes.length - this.rows : true;
    }

    isFirstPage(): boolean {
        return this.classes ? this.first === 0 : true;
    }

    // hàm save class
    SaveClass(classes: any) {
        if (!this.classesId.includes(classes.id)) {
            this.classesId.push(classes.id);
            this.toastr.success('Thêm lớp thành công');
        }
        else {
            this.classesId.splice(this.classesId.indexOf(classes.id), 1);
            this.toastr.success('Xóa lớp thành công');
        }
        console.log(this.classesId);
    }

    // hàm save classRoom
    SaveClassRoom(classRoom: any) {
        if (!this.classRoomId.includes(classRoom.id)) {
            this.classRoomId.push(classRoom.id);
            this.toastr.success('Thêm phòng học thành công');
        }
        else {
            this.classRoomId.splice(this.classRoomId.indexOf(classRoom.id), 1);
            this.toastr.success('Xóa phòng học thành công');
        }
        console.log(this.classRoomId);
    }

    // hàm save subject
    SaveSubject(subject: any) {
        if (!this.subjectsId.includes(subject.id)) {
            this.subjectsId.push(subject.id);
            this.toastr.success('Thêm môn học thành công');
        }
        else {
            this.subjectsId.splice(this.subjectsId.indexOf(subject.id), 1);
            this.toastr.success('Xóa môn học thành công');
        }
        console.log(this.subjectsId);
    }

    // hàm post schedule
    PostSchedule() {
        if(this.classesId.length == 0){
            this.toastr.error('Vui lòng chọn lớp học');
            return;
        }
        if(this.classRoomId.length == 0){
            this.toastr.error('Vui lòng chọn phòng học');
            return;
        }
        if(this.subjectsId.length == 0){
            this.toastr.error('Vui lòng chọn môn học');
            return;
        }
        if(this.dateStart == null){
            this.toastr.error('Vui lòng chọn ngày bắt đầu');
            return;
        }
        if(this.dateEnd == null){
            this.toastr.error('Vui lòng chọn ngày kết thúc');
            return;
        }
        let Count = localStorage.getItem('count')
        let CountNumber = 0
        if(Count == null){
            localStorage.setItem('count', '0');
        }
        else {
            CountNumber = parseInt(Count);
            CountNumber++;
            localStorage.setItem('count', CountNumber.toString());
        }

        this.currenDate = new Date();

        let model = {
            dateStart:this.dateStart,
            dateEnd: this.dateEnd,
            dateCreate: this.currenDate,
            Count: CountNumber,
            idclasses: this.classesId,
            idclassRooms: this.classRoomId,
            idsubjects: this.subjectsId
        }
        this.lectureService.postSchedule(model).subscribe((res: any) => {
            if (res.statusCode == 200) {
                this.toastr.success('Thực hiện thành công');
                this.lectureService.getSchedule(1,999, CountNumber).subscribe((res: any) => {
                    this.schedules = res.result;
                    let i = 1;
                    this.schedules.forEach((element: any) => {
                        element.NumericalOrder = i++;
                    });
                });
                this.classesId = [];
                this.classRoomId = [];
                this.subjectsId = [];
            }
            else {
                this.toastr.error('Thực hiện thất bại');
            }
        });
    }

}

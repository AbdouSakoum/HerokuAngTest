import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  formDetail!: FormGroup;
  //form!: FormGroup;
  formHappy!: FormGroup;
  formSad!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.formDetail = new FormGroup ({
      first: new FormControl(''),
      second: new FormControl(''),
      third: new FormControl(''),
      date: new FormControl('2021-11-12'),
      idPatient: new FormControl(1)
     });
  
     this.formSad = new FormGroup({
      date: new FormControl('2021-11-12'),
      title: new FormControl('Sad'),
      idPatient: new FormControl(1)
    });
  }

  popupSadModal: boolean = false ;
  open(){
    this.popupSadModal = true;
  }
  close(){
    this.popupSadModal = false;
  }
  onSubmit(){
    console.log(this.formDetail.value)
    console.log(this.formSad.value);
  }

}

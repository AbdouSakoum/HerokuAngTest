import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Patient } from '../Model/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formlogin !: FormGroup;
  public patient!: Patient;
  keyIdPatient!: string;
  
  constructor(public patientService: PatientService,
              private router: Router) { }

  ngOnInit(): void {
    this.patientService.currentMessage.subscribe(
      message => this.keyIdPatient = message
    )


    this.formlogin = new FormGroup({
      email: new FormControl('', Validators.requiredTrue),
      password: new FormControl('', Validators.min(5))
      })
  }

  get f(){
    return this.formlogin.controls; 
  }

  submit(){
    console.log(this.formlogin.value);
    this.patientService.login(this.formlogin.value)
    .subscribe((res:Patient)=>{
      //this.patient = data;
      if(res==null){
        this.alertWithError();
      }else{
        this.patient= res;
        this.patientService.changeMessage(String(this.patient.id));
        this.router.navigateByUrl('/profil');
        //myTest();
        console.log(this.patient);        
      }
    },
    (error)=>{
      this.alertWithError();
    }
    )
  }

  alertWithError(){
    return Swal.fire('les informations saisis sont incorrects',
     'merci de saisir les bons infos. \n Si vous avez perdu vos infos, merci de contacter le support', 'error' )
    }


}

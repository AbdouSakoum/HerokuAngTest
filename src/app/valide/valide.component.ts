import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Patient } from '../Model/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-valide',
  templateUrl: './valide.component.html',
  styleUrls: ['./valide.component.css']
})
export class ValideComponent implements OnInit {

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');


  phrase: string = "j'ai un compte"
  form!: FormGroup;
  formEnfant!: FormGroup;
  formReponse !: FormGroup;
  patient!: Patient ;
  keyIdPatient!: string;
  sendMessage!: string;

  constructor(
    public patientService: PatientService,
    private router: Router
  ) { }

  /*----------Formulaire enfant------------*/
  popup!:string;


  ngOnInit(): void {

    /*-------------id transfert----------------*/
    this.patientService.currentMessage.subscribe(
      message => this.keyIdPatient = message
        );
    /*-------------enfant transfert------------*/
    //this.patientService.currentPopup.subscribe(
    //  messagepopup => this.popup = messagepopup
    //);


    

    /*---------Formulaire de validation--------*/
    this.form = new FormGroup({
      patientCode: new FormControl('', [Validators.required]),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      langue: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dateValidation: new FormControl(this.cValue),
      dateReponse: new FormControl(this.cValue),
    }); 

  }
  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.patientService.valide(this.form.value).
    subscribe((res: Patient) => {
      this.patient = res;
      console.log(this.patient);

      this.formEnfant = new FormGroup({
        id: new FormControl(this.patient.id, [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
        nom: new FormControl(this.patient.nom, [Validators.required]),
        date: new FormControl('', [Validators.required]),
        genre: new FormControl('', [Validators.required]),
        idPatient: new FormControl(this.patient.id, [Validators.required])
      });
      this.formReponse = new FormGroup({
        texte: new FormControl('welcome to our platforme', [Validators.required]),
        name: new FormControl('first video', [Validators.required]),
        src: new FormControl('http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov', [Validators.required]),
        type: new FormControl('video/mp4', [Validators.required]),
        date: new FormControl(this.cValue, [Validators.required]),
        idPatient: new FormControl(this.patient.id, [Validators.required])
      });
      console.log(this.formEnfant.value);
      this.addPreEnfant(this.formEnfant.value);
      console.log(this.formReponse.value);
      this.addFirstReponse(this.formReponse.value);

      
      this.sendMessage= String(this.patient.id)+' '+this.patient.patientCode ;
      console.log(this.sendMessage)
      this.patientService.changeMessage(this.sendMessage);
      //this.patientService.changePopup(String(this.patient.id)+' '+this.patient.patientCode);
      this.router.navigateByUrl('/profil');
      //this.alertWithSuccess();      
    },
   (error)=>{
      this.alertWithError();
     //alert("le code que vous avez saisi est invalide, merci de saisir le bon code. \n Si vous avez perdu votre code, merci de contacter le support")
   }
   )  
  }
  addPreEnfant(content:any){
    this.patientService.addEnfant(content)
    .subscribe((res)=>{
        console.log(content)
      },
      (error)=>{
        //this.alertWithError()
      })
     }
  addFirstReponse(content: any){
    this.patientService.addReponse(content)
    .subscribe(res=>{
      console.log(content);
    },
    (error)=>{
      console.log(error);
    })
  }


  alertWithSuccess(){
    Swal.fire('Votre compte est activé', "Vous pouvez se connecter via cliquer sur j'ai un compte.", 'success')
  }

  alertWithError(){
    return Swal.fire('le code que vous avez saisi est invalide',
     'merci de saisir le bon code. \n Si vous avez perdu votre code, merci de contacter le support', 'error' )
    }
}

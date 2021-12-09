import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import Swal from 'sweetalert2';
import { Detail } from '../Model/detail';
import { Enfant } from '../Model/enfant';
import { Patient } from '../Model/patient';
import { Reponse } from '../Model/reponse';
import { Sentiment } from '../Model/sentiment';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  videoItems=
  [
    {
      name: 'Video one',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    }
  ];

  activeIndex = this.videoItems.length-1;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;


  //------sentiment et detail--------------------------------------------------
  public sentiments!: Sentiment[];

  title = 'modal2';
  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  Events=[];
  calendarOptions!: CalendarOptions;
                     
  formDetail!: FormGroup;
  //form!: FormGroup;
  formHappy!: FormGroup;
  formSad!: FormGroup;

  //------Patient et enfant----------------------------------------------------
  public patient!: Patient;
  public enfant!: Enfant;
  public reponse !: Reponse ;
  mdp : any; 
  mdpValue : any;

  keyInfoPatient!: string;
  keyPatient !: string;

  indexPop : string ="";
  stringPopupController:string = "false";
  popupController!: boolean ;

  formEnfant!: FormGroup;
  updateFormPatient!: FormGroup;
  updateFormEnfant!: FormGroup;
  mdpFormAncien!: FormGroup;
  updateFormPsd!: FormGroup;

  

  //-----Constructor------------------------------------------------------------
  constructor( public patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    //private modalService: NgbModal
    ) { }

//---------button form patient----------------------------------------------


//-----ngOnInit----------------------------------------------------------------
//-----ngOnInit----------------------------------------------------------------
  ngOnInit(): void {

    //---------message recus--------------------------------
    this.patientService.currentMessage.subscribe(
      message => this.keyInfoPatient = message
    );
    console.log(this.keyInfoPatient);
    //---------split message--------------------------------
    //console.log(this.keyInfoPatient)
    var listeString = this.keyInfoPatient.split(" ",10);
    this.keyPatient = listeString[0];
    //console.log(this.keyPatient);
    //---------condition de modal enfant--------------------
    this.indexPop =this.stringPopupController + listeString[1]+ this.indexPop;
    //console.log(this.indexPop);
    this.popupController = this.getBoolean(this.indexPop);
    console.log(this.popupController);
    if(this.popupController==true){
      this.divPatient = false;
    }else{
      this.divPatient= true;
    };
    //console.log(this.popupController);

    //-----------Get patient infos------------------------------
    this.patientService.get(Number(this.keyPatient)).subscribe((data: Patient) =>{
      this.patient = data;
    console.log(this.patient);
    });
    //-----------Get sentiment infos----------------------------
    this.patientService.getEnfant(Number(this.keyPatient)).subscribe((dataEnfant: Enfant)=>{
      this.enfant = dataEnfant;
    console.log(this.enfant);
    });
    //-----------Get sentiment infos----------------------------
    this.patientService.getAlls(Number(this.keyPatient)).subscribe((source: Sentiment[]) =>{
      this.sentiments = source;
    //console.log(this.sentiments.length);
    });
    //-----------Get Reponse-----------------------------------
    this.patientService.getLastReponse(Number(this.keyPatient)).subscribe((data: Reponse)=>{
      this.reponse = data ;
    });
    //-----------Calendrier------------------------------
    setTimeout(() => {
      return this.patientService.getAlls(Number(this.keyPatient)).subscribe((response: any) =>{
        this.Events = response;
           // console.log(this.Events);
        });
    }, 2200);

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        contentHeight: 480,
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      };
    }, 2500);

    /*------------------------------Form Sad--------------------------------*/
    this.formDetail = new FormGroup ({
      first: new FormControl(''),
      second: new FormControl(''),
      third: new FormControl(''),
      date: new FormControl(this.cValue),
      idPatient: new FormControl(Number(this.keyPatient))
     });
  
     this.formSad = new FormGroup({
      date: new FormControl(this.cValue, [Validators.required]),
      title: new FormControl('Sad', Validators.required),
      idPatient: new FormControl(Number(this.keyPatient), Validators.required)
    });

    /*------------------------------Form Enfant-----------------------------*/

    this.formEnfant = new FormGroup({
      id: new FormControl(Number(this.keyPatient)),
      prenom: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      idPatient:new FormControl(Number(this.keyPatient))
      });
      
    /*-------------------------------Form update Patient--------------------*/
    this.updateFormPatient = new FormGroup({
      id: new FormControl(Number(this.keyPatient)),
      email: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      password: new FormControl(''),
      patientCode: new FormControl('valid'),
      phone: new FormControl(''),
      dateValidation: new FormControl(''),
      dateReponse: new FormControl(''),
      langue: new FormControl(''),
    });

    /*----------------FormUpdateEnfant---------------------*/
    this.updateFormEnfant = new FormGroup({
      id: new FormControl(Number(this.keyPatient)),
      prenom: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      idPatient:new FormControl(Number(this.keyPatient))
     });

     /*---------------------FormPassword-------------------------*/
     //-----------Form mdp ancien------------------------
     this.mdpFormAncien = new FormGroup({
      password: new FormControl('')
     });
     //-----------Form update password-------------------
     this.updateFormPsd = new FormGroup({
      id: new FormControl(Number(this.keyPatient)),
      email: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      password: new FormControl(''),
      patientCode: new FormControl('valid'),
      phone: new FormControl(''),
      dateValidation: new FormControl(''),
      dateReponse: new FormControl(''),
      langue: new FormControl(''),
    });

  }
//--------fin ngOnInit-----------------------------------------------------
//--------fin ngOnInit-----------------------------------------------------

//---------button form sentiment et detailt----------------------------------------------
addHappy(){
  this.ngOnInit();
  this.formHappy = new FormGroup({
    date: new FormControl(this.cValue, [Validators.required]),
    title: new FormControl('happy', Validators.required),
    idPatient: new FormControl(Number(this.keyPatient), Validators.required)
  });
  console.log(this.formHappy.value)
  this.patientService.add(this.formHappy.value)
  .subscribe((res)=>{      
    this.alertWithSuccess()
    this.ngOnInit();
  },
  (error)=>{
    this.alertWithError()
           })
  }

onDateClick(reponse:any) {
  alert('Clicked on date : ' + reponse.dateStr)
}

popupSadModal : boolean =false;
openSadModal(){
  this.divCalendrier = false ;
  this.popupSadModal = true ;
}
close(){
  this.popupSadModal = false;
  this.divCalendrier = true;
}

onSubmit() {
  
  //this.modalService.dismissAll();
  //console.log(this.formSad.value);
  //console.log(this.formDetail.value);
  this.patientService.add(this.formSad.value)
  .subscribe((res: Sentiment)=>{
      //console.log(this.editProfileForm.value)
      this.addPreDetail(this.formDetail.value)
      this.alertWithSuccess();
      this.ngOnInit();
      //console.log("res")
    },
    (error)=>{
      this.alertWithError()
    }
    );
  this.popupSadModal = false;
  this.divCalendrier = true;
  this.ngOnInit();
  }
addPreDetail(content:any){
  //this.modalService.dismissAll();
  this.patientService.addDetail(content)
  .subscribe((res)=>{
      console.log(content)
    },
    (error)=>{
      //this.alertWithError()
    })
   }


//--------deconnexion------------------------------------------------------
deconnexion(){
  this.keyPatient = "Unknown";
  this.router.navigateByUrl('/login');
}
//---------button  form update password------------------------------------
divPwd: boolean = false ;
mdpButtonAncien(){
  this.mdp = this.mdpFormAncien.value;
  this.mdpValue = {password: this.patient.password};
  if(JSON.stringify(this.mdp)==JSON.stringify(this.mdpValue)){
    console.log("true")
    this.divPwd=true;
  }else{
    this.alertWithErrorpwd();
    //console.log(this.mdpValue)
    //console.log(this.mdp)
  }
}


updateButtonPsd(){
  //console.log(this.updateFormPsd.value)
  this.patientService.update(this.updateFormPsd.value)
  .subscribe((dataUpdatePwd:any)=>{
    this.alertWithSuccessUpdate();
    
    this.ngOnInit();
    this.divPatient=true;
    this.divMedecin=false;
    //this.divHelp=false;
    this.divParam=false;
  },
  (error)=>{
    this.alertWithErrorUpdate()
    //console.log(error)
  })
}
//---------button  form update for patient and enfant------------------------------------
updateButtonPatient(){
  console.log(this.updateFormPatient.value)
  this.patientService.update(this.updateFormPatient.value)
  .subscribe((dataUpdatePatient:any)=>{
    this.alertWithSuccessUpdate();
    this.divHelp = false;
    this.ngOnInit();
  },
  (error)=>{
    this.alertWithErrorUpdate()
    //console.log(error)
  })
}

updateButtonEnfant(){
  this.patientService.updateEnfant(this.updateFormEnfant.value)
  .subscribe((dataUpdateEnfant:any)=>{
    console.log(dataUpdateEnfant)
    this.alertWithSuccessUpdate();
    this.divHelp = false;
    this.ngOnInit();
  },
  (error)=>{
    this.alertWithErrorUpdate()
    //console.log(error)
  })
}

//--------------video-------------------------------------------------------------
videoPlayerInit(data: any) {
  this.data = data;

  this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
  this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
}

nextVideo() {
  this.activeIndex++;

  if (this.activeIndex === this.videoItems.length) {
    this.activeIndex = 0;
  }

  this.currentVideo = this.videoItems[this.activeIndex];
}

initVdo() {
  this.data.play();
}
//--------------------------------------------------------------------------------
divCalendrier: boolean = true ;
divStatistiques: boolean=false ;

ShowCalendrier(){
  this.divCalendrier=true ;
  this.divStatistiques=false;
}

public sentimentTest: Sentiment[]=[];
public sentimentP: Sentiment[]=[];

public detailsTest: Detail[]=[];
public detailP: Detail[]=[];
public listStatistique: any[]=[]; 
public nbreHappy : number = 0 ;public nbreSad : number = 0 ; public nbreSemaine : number = 0;

public nbreFirstRep1: number = 0 ; public nbreFirstRep2: number = 0 ; public nbreFirstRep3: number = 0 ;

public nbreSecondRep1: number = 0 ; public nbreSecondRep2: number = 0 ; public nbreSecondRep3: number = 0 ;

public nbreThirdRep1: number = 0 ; public nbreThirdRep2: number = 0 ; public nbreThirdRep3: number = 0 ;

ShowStatistiques(date: Date, code:any){
  this.divStatistiques=true ;
  this.divCalendrier=false;
  this.listStatistique=[];

  let dateFirst = new Date(date)
  let dateTwoPre = new Date(date);
  let dateTwo = new Date(dateTwoPre.setDate(dateTwoPre.getDate() + 14));

  let compt: number ;  let nbreJour = 0;  this.nbreSemaine = 0 ;

  this.patientService.getAllSentiments(code)
  .subscribe((dataAllSentiment: Sentiment[])=>{
    this.sentimentTest = dataAllSentiment;

    this.patientService.getAllDetails(code)
    .subscribe((dataDetail: Detail[])=>{
      this.detailsTest= dataDetail;

      compt = this.sentimentTest.length;

      for(let i=0; i<=compt; i++){

        this.detailsTest.forEach((elementDetail: Detail, index)=>{
          let dateDetailCurrent = new Date(elementDetail.date)
          if(dateDetailCurrent<=dateTwo && dateDetailCurrent>=dateFirst){
              this.detailP.push(elementDetail);
              delete this.detailsTest[index];
          }
        });
        this.sentimentTest.forEach((element: Sentiment, index)=>{

          let dateCurrent = new Date(element.date) 
          if(dateCurrent<=dateTwo && dateCurrent>=dateFirst){
              this.sentimentP.push(element);
              delete this.sentimentTest[index];
          }
        });

        compt = 0;
        this.sentimentP.forEach(e =>{
            if(JSON.stringify(e.title) == JSON.stringify('happy')){
                this.nbreHappy += 1 ;
                compt += 1;
            }else if (JSON.stringify(e.title) == JSON.stringify('Sad')) {
                this.nbreSad += 1 ;
                compt += 1;
            }else{
                compt += 1;
            }
        });

        this.detailP.forEach(e =>{
          switch (e.first) {
            case 1:
                this.nbreFirstRep1 += 1 ;
                break;
            case 2:
                this.nbreFirstRep2 += 1 ;
                break;
            case 3:
                this.nbreFirstRep3 += 1 ;
                break;
          }
          switch (e.second) {
            case 1:
                this.nbreSecondRep1 += 1 ;
                break;
            case 2:
                this.nbreSecondRep2 += 1 ;
                break;
            case 3:
                this.nbreSecondRep3 += 1 ;
                break;
          }
          switch (e.third) {
            case 1:
                this.nbreThirdRep1 += 1 ;
                break;
            case 2:
                this.nbreThirdRep2 += 1 ;
                break;
            case 3:
                this.nbreThirdRep3 += 1 ;
                break;
          }
        });

        this.nbreSemaine += 1 ;

        this.listStatistique.push({ semaine: "semaine "+this.nbreSemaine, nombreHappy: this.nbreHappy, 
        nombreSad: this.nbreSad,
        Q1R1 : this.nbreFirstRep1, Q1R2 : this.nbreFirstRep2, Q1R3 : this.nbreFirstRep3,
        Q2R1 : this.nbreSecondRep1, Q2R2 : this.nbreSecondRep2, Q2R3 : this.nbreSecondRep3,
        Q3R1 : this.nbreThirdRep1, Q3R2 : this.nbreThirdRep2, Q3R3 : this.nbreThirdRep3,
        sentiment : this.sentimentP});

        this.nbreHappy = 0 ; this.nbreSad = 0 ; 

        this.nbreFirstRep1 = 0; this.nbreFirstRep2 = 0; this.nbreFirstRep3 = 0;
        this.nbreSecondRep1 = 0; this.nbreSecondRep2 = 0; this.nbreSecondRep3 = 0;
        this.nbreThirdRep1 = 0; this.nbreThirdRep2 = 0; this.nbreThirdRep3 = 0;
        this.sentimentP = [];
        this.detailP = [];
                
        nbreJour=14;
        dateFirst.setDate(dateFirst.getDate()+nbreJour);
        dateTwo.setDate(dateTwo.getDate()+nbreJour);

      }
    })
    console.log(this.listStatistique)
  })
}

divPatient:boolean=true;
divMedecin:boolean=false;
divHelp: boolean=false;

divParam:boolean=false;



ShowProfil(){
  this.ngOnInit();
  this.divPatient=true;
  this.divMedecin=false;
  //this.divHelp=false;
  this.divParam=false;

}
ShowMedecin(){
  this.ngOnInit();
  this.divPatient=false;
  this.divMedecin=true
  //this.divHelp=false;
  this.divParam=false;
}
ShowParam(){
this.ngOnInit();
this.divPatient=false;
this.divMedecin=false;
//this.divHelp=true;
this.divParam=true;
}
ShowHelp(){
  this.ngOnInit();
  this.divPatient=false;
  this.divMedecin=false;
  //this.divHelp=true;
  this.divParam=true;
}



//---------parametre------------------------



divInfoPersonnel: boolean= true;
divInfoEnfant: boolean = false;
divInfoParam: boolean=false;
divTutorial:boolean=false;
Showtutorial(){
  this.divTutorial=true;
  this.divInfoPersonnel=false;
  this.divInfoEnfant = false;
  this.divInfoParam = false;
}

ShowInfoPersonnel(){
  this.divTutorial=false;
  this.divInfoPersonnel=true;
  this.divInfoEnfant = false;
  this.divInfoParam = false;
}

ShowInfoEnfant(){
  this.divTutorial=false;
  this.divInfoPersonnel=false;
  this.divInfoEnfant = true;
  this.divInfoParam = false;
}

ShowInfoParam(){
  this.divTutorial=false;
  this.divInfoPersonnel=false;
  this.divInfoEnfant = false;
  this.divInfoParam = true;
}

/*************Question*********/
qst1 : boolean=true; qst2 : boolean=false; qst3 : boolean=false;
ShowQst1(){
  this.qst1 = true;
  this.qst2 = false;
  this.qst3 = false;
}
ShowQst2(){
  this.qst1 = false;
  this.qst2 = true;
  this.qst3 = false; 
}
ShowQst3(){
  this.qst1 = false;
  this.qst2 = false;
  this.qst3 = true; 
}





//---------button form enfant----------------------------------------------
onEnfantTwo() {
  console.log(this.formEnfant.value)
}
onEnfant(){
  console.log(this.indexPop)
  console.log(this.formEnfant.value)
  this.patientService.updateEnfant(this.formEnfant.value)
  .subscribe((resEnfant: Enfant)=>{   
    console.log(resEnfant);
    this.indexPop= this.indexPop+"false";
    console.log(this.indexPop);
    this.ngOnInit();
    //this.alertWithSuccess();
    
  },(error)=>{
    this.alertWithError()
  }
  ) 
}
getBoolean(value:any){
  switch(value){
       case "falsevalid":
           return true;
       default: 
           return false;
   }
}

//---------others functions----------------------------------------------
alertWithError(){
  return Swal.fire("votre reponse d'aujourd'hui a été déjà enregistré",
  "vous avez la possibilité de répondre à cette question une seule fois par jour", 'error' )
  }

alertWithSuccess(){
  Swal.fire('Votre réponse est bien enregistré', "n'oubliez pas de nous inviter demain pour re-répondre au question", 'success')
  }

alertWithSuccessUpdate(){
    Swal.fire('well done', "votre modifications sont bien enregistré", 'success')
    }

alertWithErrorUpdate(){
      return Swal.fire("votre informations ne sont pas enregistrés",
      "veillez essayer plus tard", 'error' )
      }

alertWithErrorpwd(){
      return Swal.fire("Votre mot de passe est incorrect",
      "veillez saisir le bon mot de passe", 'error' )
      }


//---------else----------------------------------------------



}

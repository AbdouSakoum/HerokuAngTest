import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Detail } from '../Model/detail';
import { Enfant } from '../Model/enfant';
import { Patient } from '../Model/patient';
import { Reponse } from '../Model/reponse';
import { Sentiment } from '../Model/sentiment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  //private apiUrl = "http://localhost:8080/";
  private apiUrl = "https://patientspringapp.herokuapp.com/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'mon-jeton',
      observe: 'response'
    })
  };

  constructor(private httpClient: HttpClient) { }

  //Send Message
  private messagesource = new BehaviorSubject('default message');
  currentMessage = this.messagesource.asObservable();                       
  changeMessage(keyIdPatient: string) {                                     
      this.messagesource.next(keyIdPatient) }  

  //Login
  login(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.apiUrl + 'patient/login', JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiUrl+'patient/all')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(patient : Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.apiUrl + 'patient/add', JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  get(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(this.apiUrl+'patient/find/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  valide(patient: Patient): Observable<Patient> {
    return this.httpClient.put<Patient>(this.apiUrl + 'patient/validation', JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
      )
  }

  update(patient : Patient): Observable<Patient> {
    return this.httpClient.put<Patient>(this.apiUrl + 'patient/update', JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  /*--------------------Sentiment & detail function's------------------------------------*/
  getAlls(idPatient: number): Observable<Sentiment[]>{
    return this.httpClient.get<Sentiment[]>(this.apiUrl+'sentiment/all/'+idPatient)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  getAllSentiments(idPatient: number): Observable<Sentiment[]>{
    return this.httpClient.get<Sentiment[]>(this.apiUrl+'sentiment/all/'+idPatient)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  addDetail(detail: Detail){
    return this.httpClient.post<Detail>(this.apiUrl+'detail/add', JSON.stringify(detail), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllDetails(idPatient: number): Observable<Detail[]>{
    return this.httpClient.get<Detail[]>(this.apiUrl+'detail/all/'+idPatient)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  add(sentiment: Sentiment){
    return this.httpClient.post<Sentiment>(this.apiUrl+'sentiment/add', JSON.stringify(sentiment), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  addSimple(sentiment: Sentiment): Observable<Sentiment>{
    return this.httpClient.post<Sentiment>(this.apiUrl+'sentiment/addSimple', JSON.stringify(sentiment), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
/*--------------------Reponses---------------------------------------------*/
getAllReponse(idPatient: number): Observable<Reponse[]>{
  return this.httpClient.get<Reponse[]>(this.apiUrl+'reponse/all/'+idPatient)
  .pipe(
    catchError(this.errorHandler)
  )
}
getLastReponse(idPatient: number): Observable<Reponse>{
  return this.httpClient.get<Reponse>(this.apiUrl+'reponse/last/'+idPatient)
  .pipe(
    catchError(this.errorHandler)
  )
}



/*--------------------Enfant function's------------------------------------*/
  addEnfant(enfant: Enfant){
    return this.httpClient.post<Enfant>(this.apiUrl+'enfant/add', JSON.stringify(enfant), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getEnfant(idPatient: number): Observable<Enfant>{
    return this.httpClient.get<Enfant>(this.apiUrl+'enfant/all/'+idPatient)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateEnfant(enfant : Enfant): Observable<Enfant> {
    return this.httpClient.put<Enfant>(this.apiUrl + 'enfant/update', JSON.stringify(enfant), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //-----------reponse
  addReponse(reponse: Reponse): Observable<Reponse>{
    return this.httpClient.post<Reponse>(this.apiUrl+'reponse/add', JSON.stringify(reponse), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }




  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}

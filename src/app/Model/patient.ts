export interface Patient {
    id: number;
    patientCode: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    phone: string;
    dateValidation: Date ;
    dateReponse: Date;
    langue: string ;
  }
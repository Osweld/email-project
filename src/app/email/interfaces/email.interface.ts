

export interface SimpleEmail {
  to:string;
  subject:string;
  body:string;
}

export interface MultipleDestinataryEmail {
  to:string[];
  subject:string;
  body:string;
}

export interface UserInfo {
  to:string;
  subject:string;
  body:string;
  name:string;
}

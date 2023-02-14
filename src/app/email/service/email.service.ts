import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MultipleDestinataryEmail, SimpleEmail, UserInfo } from '../interfaces/email.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  BaseUrl: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  sendSimpleEmail(simpleEmail: SimpleEmail): Observable<SimpleEmail> {
    const url = `${this.BaseUrl}/api/v1/email/simple`;
    return this.http.post<SimpleEmail>(url, simpleEmail);
  }

  sendMultipleDestinataryEmail(multipleDestinataryEmail: MultipleDestinataryEmail): Observable<MultipleDestinataryEmail> {
    const url = `${this.BaseUrl}/api/v1/email/multiple`;
    return this.http.post<MultipleDestinataryEmail>(url, multipleDestinataryEmail);
  }

  sendEmailWithFiles(formData: FormData): Observable<SimpleEmail> {
    const url = `${this.BaseUrl}/api/v1/email/files`;
    return this.http.post<SimpleEmail>(url, formData);
  }

  sendEmailFreeMaker(user:UserInfo): Observable<UserInfo> {
    const url = `${this.BaseUrl}/api/v1/email/freemaker`;
    return this.http.post<UserInfo>(url, user);
  }


}

import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../service/email.service';
import { SimpleEmail } from '../../interfaces/email.interface';
import { Toast } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-simple-email',
  templateUrl: './simple-email.component.html',
  styleUrls: ['./simple-email.component.css']
})
export class SimpleEmailComponent {

  isSending:boolean = false;

  @ViewChild('toast') toast!: ToastComponent;


  simpleEmail: SimpleEmail = {
    to: '',
    subject: '',
    body: ''
  }

  simpleEmailForm: FormGroup = this.fb.group({
    to: [, [Validators.required, Validators.email]],
    subject: [, [Validators.required, Validators.maxLength(50)]],
    body: [, [Validators.required, Validators.maxLength(300)]]
  })

  simpleEmailValidationMessages = {
    'to': [
      { type: 'required', message: 'El email es requerido' },
      { type: 'email', message: 'El formato de email invalido' },
    ],
    'subject': [
      { type: 'required', message: 'El asunto es requerido' },
      { type: 'maxlength', message: 'El asunto no puede sobrepasar los 45 caracteres' },
    ],
    'body': [
      { type: 'required', message: 'El texto es requerido' },
      { type: 'maxlength', message: 'El texto no puede sobrepasar los 300 caracteres' },
    ]
  }


  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  resetForm() {
    this.simpleEmailForm.reset({
      to: this.simpleEmail.to,
    subject: '',
    body: ''
    })
  }




  isFormControlValid(control: string) {
    return this.simpleEmailForm.get(control)?.errors && this.simpleEmailForm.get(control)?.touched
  }


  send() {

    if (this.simpleEmailForm.invalid) {
      this.simpleEmailForm.markAllAsTouched();
      return;
    }
    this.isSending = true;

    this.simpleEmail.to = this.simpleEmailForm.value.to;
    this.simpleEmail.subject = this.simpleEmailForm.value.subject;
    this.simpleEmail.body = this.simpleEmailForm.value.body;

    this.emailService.sendSimpleEmail(this.simpleEmail).subscribe({
      next: () => {
        this.toast.isSuccess(true);
        this.toast.showToast();
        this.resetForm()
        this.isSending = false;

      },
      error:() => {
        this.toast.isSuccess(false);
        this.toast.showToast();
        this.isSending = false;
      }
    })
  }




}

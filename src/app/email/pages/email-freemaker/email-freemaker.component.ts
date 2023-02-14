import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../components/toast/toast.component';
import { SimpleEmail, UserInfo } from '../../interfaces/email.interface';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-email-freemaker',
  templateUrl: './email-freemaker.component.html',
  styleUrls: ['./email-freemaker.component.css']
})
export class EmailFreemakerComponent {

  isSending: boolean = false;

  @ViewChild('toast') toast!: ToastComponent;


  user: UserInfo = {
    to: '',
    subject: '',
    body: '',
    name: ''
  }

  simpleEmailForm: FormGroup = this.fb.group({
    name: [, [Validators.required, Validators.maxLength(50)]],
    to: [, [Validators.required, Validators.email]],
    subject: [, [Validators.required, Validators.maxLength(50)]],
    body: [, [Validators.required, Validators.maxLength(300)]],

  })

  simpleEmailValidationMessages = {
    'to': [
      { type: 'required', message: 'El email es requerido' },
      { type: 'email', message: 'El formato de email invalido' },
    ],
    'name': [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 50 caracteres' },
    ],
    'subject': [
      { type: 'required', message: 'El asunto es requerido' },
      { type: 'maxlength', message: 'El asunto no puede sobrepasar los 50 caracteres' },
    ],
    'body': [
      { type: 'required', message: 'El texto es requerido' },
      { type: 'maxlength', message: 'El texto no puede sobrepasar los 300 caracteres' },
    ]
  }


  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  resetForm() {
    this.simpleEmailForm.reset({
      name: '',
      to: this.user.to,
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

    this.user.to = this.simpleEmailForm.value.to;
    this.user.name = this.simpleEmailForm.value.name;
    this.user.subject = this.simpleEmailForm.value.subject;
    this.user.body = this.simpleEmailForm.value.body;

    this.emailService.sendEmailFreeMaker(this.user).subscribe({
      next: () => {
        this.toast.isSuccess(true);
        this.toast.showToast();
        this.resetForm()
        this.isSending = false;

      },
      error: () => {
        this.toast.isSuccess(false);
        this.toast.showToast();
        this.isSending = false;
      }
    })
  }


}


import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../components/toast/toast.component';
import { MultipleDestinataryEmail, SimpleEmail } from '../../interfaces/email.interface';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-multiple-email',
  templateUrl: './multiple-email.component.html',
  styleUrls: ['./multiple-email.component.css']
})
export class MultipleEmailComponent {

  isSending:boolean = false;

 @ViewChild('toast') toast!: ToastComponent;


 multipleDestinataryEmail: MultipleDestinataryEmail = {
    to: [],
    subject: '',
    body: ''
  }

  multipleEmailForm: FormGroup = this.fb.group({
    to: ['', [Validators.required,Validators.pattern("^([a-z][a-z0-9_.]+@([a-z0-9-]+\.)+[a-z]{2,6}(;)*)+$")]],
    subject: ['', [Validators.required, Validators.maxLength(50)]],
    body: ['', [Validators.required, Validators.maxLength(300)]]
  })
  simpleEmailValidationMessages = {
    'to': [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'El formato de email invalido' },
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

    this.multipleEmailForm.reset({
    to: this.multipleEmailForm.value.to,
    subject: '',
    body: ''
    })
  }




  isFormControlValid(control: string) {
    return this.multipleEmailForm.get(control)?.errors && this.multipleEmailForm.get(control)?.touched
  }


  send() {

    if (this.multipleEmailForm.invalid) {
      this.multipleEmailForm.markAllAsTouched();
      return;
    }

    this.multipleDestinataryEmail.to = this.multipleEmailForm.value.to.split(';');
    this.multipleDestinataryEmail.subject = this.multipleEmailForm.value.subject;
    this.multipleDestinataryEmail.body = this.multipleEmailForm.value.body;

    this.emailService.sendMultipleDestinataryEmail(this.multipleDestinataryEmail).subscribe({
      next: () => {
        this.toast.isSuccess(true);
        this.toast.showToast();
        this.resetForm()

      },
      error:() => {
        this.toast.isSuccess(false);
        this.toast.showToast();
      }
    })


    // me quede en pasar los datos del form al objeto y falta crear el servicio
  }

}

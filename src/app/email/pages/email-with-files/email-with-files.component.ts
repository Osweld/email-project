import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../components/toast/toast.component';
import { SimpleEmail } from '../../interfaces/email.interface';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-email-with-files',
  templateUrl: './email-with-files.component.html',
  styleUrls: ['./email-with-files.component.css']
})
export class EmailWithFilesComponent {

  isSending:boolean = false;
  formData:FormData = new FormData();

  @ViewChild('toast') toast!: ToastComponent;


  simpleEmail: SimpleEmail = {
    to: '',
    subject: '',
    body: ''
  }

  simpleEmailForm: FormGroup = this.fb.group({
    to: [, [Validators.required, Validators.email]],
    subject: [, [Validators.required, Validators.maxLength(50)]],
    body: [, [Validators.required, Validators.maxLength(300)]],
    files: [, [Validators.required]],
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
    ],
    'files': [
      { type: 'required', message: 'Es requerido al menos un archivo' }
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
    this.formData.append("simpleEmail",new Blob([JSON.stringify(this.simpleEmail)], {type: 'application/json'}))
    this.emailService.sendEmailWithFiles(this.formData).subscribe({
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



  onFileChange($event: any) {


    this.formData = new FormData();
    for(let i = 0; i < $event.target.files.length;i++){
      this.formData.append('files[]',$event.target.files[i])
    }

  }

}

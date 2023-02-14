import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { SimpleEmailComponent } from './pages/simple-email/simple-email.component';
import { MultipleEmailComponent } from './pages/multiple-email/multiple-email.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { EmailWithFilesComponent } from './pages/email-with-files/email-with-files.component';
import { EmailFreemakerComponent } from './pages/email-freemaker/email-freemaker.component';


@NgModule({
  declarations: [
    SimpleEmailComponent,
    MultipleEmailComponent,
    HomeComponent,
    PrincipalComponent,
    ToastComponent,
    EmailWithFilesComponent,
    EmailFreemakerComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmailModule { }

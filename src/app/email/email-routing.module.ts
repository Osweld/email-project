import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailFreemakerComponent } from './pages/email-freemaker/email-freemaker.component';
import { EmailWithFilesComponent } from './pages/email-with-files/email-with-files.component';
import { HomeComponent } from './pages/home/home.component';
import { MultipleEmailComponent } from './pages/multiple-email/multiple-email.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SimpleEmailComponent } from './pages/simple-email/simple-email.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children: [
      {path: '', component: HomeComponent},
      { path: "simple", component: SimpleEmailComponent },
      { path: "multiple", component: MultipleEmailComponent },
      { path: "email-files", component: EmailWithFilesComponent },
      { path: "email-freemaker", component: EmailFreemakerComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }

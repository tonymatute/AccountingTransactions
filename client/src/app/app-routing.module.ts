import { AuthorizedPathGuard } from './_guards/authorized-path.guard';
import { AdultListComponent } from './adults/adult-list/adult-list.component';
import { ScoutTransactionsComponent } from './scouts/scout-transactions/scout-transactions.component';
import { ScoutListComponent } from './scouts/scout-list/scout-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdultTransactionsComponent } from './adults/adult-transactions/adult-transactions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizedPathGuard],
    children: [
      { path: 'adults', component: AdultListComponent },
      { path: 'adults/:id', component: AdultTransactionsComponent },
      { path: 'scouts', component: ScoutListComponent},
      { path: 'scouts/:id', component: ScoutTransactionsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

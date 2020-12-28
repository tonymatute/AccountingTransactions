import { ScoutDetailedResolver } from './_resolvers/scout-detail-resolver';
import { Scout } from './_models/scout';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ScoutEditComponent } from './scouts/scout-edit/scout-edit.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ErrorTestComponent } from './errors/error-test/error-test.component';
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
import { NotFoundComponent } from './errors/not-found/not-found.component';

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
      { path: 'scouts/:id', component: ScoutTransactionsComponent , resolve: { scout: ScoutDetailedResolver}},
      {
        path: 'scout/edit/:id', component: ScoutEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
        resolve: { scout: ScoutDetailedResolver}
      },
      { path: 'user/edit', component: UserEditComponent }
    ]
  },
  { path: 'lookup', component: ScoutListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'errors', component: ErrorTestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberTransactionsComponent } from './member/member-transactions/member-transactions.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { ResetPasswordSentComponent } from './reset-password-sent/reset-password-sent.component';
import { ConfirmedEmailSentComponent } from './confirmed-email-sent/confirmed-email-sent.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ErrorTestComponent } from './errors/error-test/error-test.component';
import { AuthorizedPathGuard } from './_guards/authorized-path.guard';
import { ScoutListComponent } from './scouts/scout-list/scout-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AdminGuard } from './_guards/admin.guard';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { ConfirmedEmailComponent } from './confirmed-email/confirmed-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizedPathGuard],
    children: [      
      { path: 'member', component: MemberListComponent},
      { path: 'member/:id', component: MemberTransactionsComponent , resolve: { member: MemberDetailResolver}},
      { path: 'user/edit', component: UserEditComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] }
    ]
  },
  { path: 'export-pdf', component: ExportPdfComponent},
  { path: 'lookup', component: ScoutListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'errors', component: ErrorTestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmedEmailComponent },
  { path: 'confirmed-email-sent', component: ConfirmedEmailSentComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password-sent', component: ResetPasswordSentComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-complete', component: ResetPasswordCompleteComponent },
  { path: '**', component: HomeComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

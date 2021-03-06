import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { SharedModule } from './_modules/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { ErrorTestComponent } from './errors/error-test/error-test.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { TransactionsComponent } from './transactions/transactions.component';
import { BtnCellRenderer } from './_buttons/btn-cell-renderer/btn-cell-renderer.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CheckboxRenderer } from './_component_extentions/checkbox-renderer/checkbox-renderer.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RoleManagementComponent } from './admin/role-management/role-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { CustomTooltip } from './_component_tooltips/custom-tooltip/custom-tooltip.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { ConfirmedEmailComponent } from './confirmed-email/confirmed-email.component';
import { ConfirmedEmailSentComponent } from './confirmed-email-sent/confirmed-email-sent.component';
import { ResetPasswordSentComponent } from './reset-password-sent/reset-password-sent.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckboxInputComponent } from './_forms/checkbox-input/checkbox-input.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberTransactionsComponent } from './member/member-transactions/member-transactions.component';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { MemberAddModalComponent } from './modals/member-add-modal/member-add-modal.component';
import { UpdateTrooptrackMembersComponent } from './update-trooptrack-members/update-trooptrack-members.component';
import { ReconcileMembersComponent } from './reconcile-members/reconcile-members.component';

@NgModule({
  declarations: [    
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    DateInputComponent,
    ErrorTestComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TransactionsComponent,  
    BtnCellRenderer,
    UserEditComponent,   
    CheckboxRenderer,
    HasRoleDirective,
    AdminPanelComponent,
    RoleManagementComponent,
    RolesModalComponent,
    ExportPdfComponent,
    CustomTooltip,
    ConfirmDialogComponent,
    ConfirmedEmailComponent,
    ConfirmedEmailSentComponent,
    ResetPasswordSentComponent,
    ResetPasswordComponent,
    ResetPasswordCompleteComponent,
    ForgotPasswordComponent,
    CheckboxInputComponent,
    MemberListComponent,
    MemberTransactionsComponent,
    MemberCardComponent,
    MemberAddModalComponent,
    UpdateTrooptrackMembersComponent,
    ReconcileMembersComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgGridModule.withComponents([BtnCellRenderer, CheckboxRenderer, CustomTooltip])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

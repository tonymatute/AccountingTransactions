import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { SharedModule } from './_modules/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ScoutListComponent } from './scouts/scout-list/scout-list.component';
import { ScoutTransactionsComponent } from './scouts/scout-transactions/scout-transactions.component';
import { AdultTransactionsComponent } from './adults/adult-transactions/adult-transactions.component';
import { AdultListComponent } from './adults/adult-list/adult-list.component';
import { ErrorTestComponent } from './errors/error-test/error-test.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    DateInputComponent,
    ScoutListComponent,
    ScoutTransactionsComponent,
    AdultTransactionsComponent,
    AdultListComponent,
    ErrorTestComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

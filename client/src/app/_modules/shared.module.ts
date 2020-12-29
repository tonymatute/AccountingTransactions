import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),   
    BrowserAnimationsModule,
    TimeagoModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
    
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    BsDatepickerModule,
    TabsModule,
    PaginationModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    FileUploadModule,
    TimeagoModule,
    TooltipModule,
    ButtonsModule,
    ModalModule
  ]
})
export class SharedModule { }

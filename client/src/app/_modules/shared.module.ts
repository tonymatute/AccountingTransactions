import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    NgxGalleryModule,
    BrowserAnimationsModule
    
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    BsDatepickerModule,
    TabsModule,
    PaginationModule,
    NgxGalleryModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }

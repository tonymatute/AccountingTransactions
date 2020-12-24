import { ToastrService } from 'ngx-toastr';
import { LookupService } from './../../_services/lookup.service';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scout } from 'src/app/_models/scout';
import { ScoutService } from 'src/app/_services/scout.service';

import { LookUpTable } from 'src/app/_models/lookUpTable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-scout-edit',
  templateUrl: './scout-edit.component.html',
  styleUrls: ['./scout-edit.component.css'],
})
export class ScoutEditComponent implements OnInit {
  scout: Scout;
  maxDate: Date;
  patrols: LookUpTable[];
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private scoutService: ScoutService,
    private route: ActivatedRoute,
    private lookUpServices: LookupService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadScout();
    this.getPatrols();
  }

  loadScout() {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.scoutService
      .getScout(id).subscribe((scout) => {
        this.scout = scout;
      });
  }

  getPatrols() {
    this.lookUpServices.getPatrols().subscribe((patrols) => {
      this.patrols = patrols;
    });
  }

  updateScout() {
    this.scoutService.updateScout(this.scout).subscribe(() => {
      this.toastr.success('Scout Updated Succesfully!'); 
      this.editForm.form.markAsPristine();
    });
  }
}

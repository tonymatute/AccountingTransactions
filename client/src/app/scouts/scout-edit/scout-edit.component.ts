import { ConfirmService } from './../../_services/confirm.service';
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
import { environment } from 'src/environments/environment';
import { ScoutListComponent } from '../scout-list/scout-list.component';

@Component({
  providers: [ScoutListComponent],
  selector: 'app-scout-edit',
  templateUrl: './scout-edit.component.html',
  styleUrls: ['./scout-edit.component.css'],
})
export class ScoutEditComponent implements OnInit {
  troop: string = environment.troop;
  charteredOrganization = environment.charteredOrganization;
  troopLocation = environment.troopLocation;
  scout: Scout;

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
    private toastr: ToastrService,
    private scoutListComponent: ScoutListComponent,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loadScout();
    this.getPatrols();
  }

  loadScout() {
    this.route.data.subscribe((data) => {
      this.scout = data.scout;
    });
  }

  getPatrols() {
    this.lookUpServices.getPatrols().subscribe((patrols) => {
      this.patrols = patrols;
    });
  }

  refresh() {
    window.location.reload();
  }

  updateScout() {
    this.confirmService
      .confirm('Confirm Update', 'Are you sure you want to update this profile?',"Yes","No")
      .subscribe((result) => {
        if (result){
          this.scoutService.updateScout(this.scout).subscribe(() => {
            this.toastr.success('Scout Updated Succesfully!');
            this.editForm.form.markAsPristine();
            this.scoutListComponent.deleteScoutFromCache();
            this.scoutListComponent.loadScouts();
          });
        }
      });
  }
}

import { LookupService } from './../../_services/lookup.service';
import { ScoutListComponent } from './../scout-list/scout-list.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScoutService } from 'src/app/_services/scout.service';
import { LookUpTable } from 'src/app/_models/lookUpTable';

@Component({
  providers: [ScoutListComponent],
  selector: 'app-scout-add',
  templateUrl: './scout-add.component.html',
  styleUrls: ['./scout-add.component.css'],
})
export class ScoutAddComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  scoutAddForm: FormGroup;
  patrols: LookUpTable[];

  constructor(
    private scoutService: ScoutService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private lookUpService: LookupService,
    private scoutListComponent: ScoutListComponent
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getPatrols();
  }

  initializeForm() {
    this.scoutAddForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      dateOfBirth: [''],
      rechartedDate: ['', Validators.required],
      active: ['true'],
      activeSinceDatetime: ['', Validators.required],
      patrolId: ['', Validators.required],
    });
  }

  addScout() {
    this.scoutService
      .addNewScout(this.scoutAddForm.value)
      .subscribe((response) => {
        this.toastr.success('New Scout added sucessfull.');
        this.router.navigateByUrl('/scouts');
        this.scoutListComponent.deleteScoutFromCache();
        this.scoutListComponent.loadScouts();
      });
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  getPatrols() {
    this.lookUpService.getPatrols().subscribe((patrols) => {
      this.patrols = patrols;
    });
  }
}

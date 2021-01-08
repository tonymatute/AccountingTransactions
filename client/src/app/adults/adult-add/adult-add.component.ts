import { AdultService } from './../../_services/adult.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Adult } from 'src/app/_models/adult';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-adult-add',
  templateUrl: './adult-add.component.html',
  styleUrls: ['./adult-add.component.css'],
})
export class AdultAddComponent implements OnInit {
  adultAddForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private adultService: AdultService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  addAdult() {
    var adult = this.adultAddForm.value;
    if (adult.rechartedDate == '') adult.rechartedDate = null;
    if (adult.activeSinceDatetime == '') adult.activeSinceDatetime = null;
    if (adult.active == '') adult.active = false;
    this.adultService.addNewAdultMember(adult).subscribe((response) => {
      this.toastr.success('New Adult Member added sucessful.');
      this.router.navigateByUrl('/adults');
      // this.scoutListComponent.deleteScoutFromCache();
      // this.scoutListComponent.loadScouts();
    });
  }
  cancel() {
    this.router.navigateByUrl('/');
  }

  initializeForm() {
    this.adultAddForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      rechartedDate: [""],
      active: ['true'],
      activeSinceDatetime: [''],
    });
  }

  
}

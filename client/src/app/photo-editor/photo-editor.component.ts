import { ScoutService } from 'src/app/_services/scout.service';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Scout } from '../_models/scout';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() scout: Scout;
  uploader: FileUploader
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  uploaderMode: boolean = false;

  constructor(private accountService: AccountService, private scoutService : ScoutService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Scout/add-photo?memberId=' + this.scout.memberId,
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const scout = JSON.parse(response);
        this.scout.photoUrl = scout.photoUrl;
        this.scout.publicId = scout.publicId;
      }
    }
  }

  uploaderToggle() {
    this.uploaderMode = !this.uploaderMode;
  }

  deletePhoto(publicId: string) {    
    this.scoutService.deletePhoto(publicId).subscribe(() => {
      this.scout.publicId = null;
      this.scout.photoUrl = null;
    })    
  }

}

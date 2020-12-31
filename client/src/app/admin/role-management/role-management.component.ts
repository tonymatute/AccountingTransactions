import { GridtService } from './../../_services/grid.service';

import { RolesModalComponent } from './../../modals/roles-modal/roles-modal.component';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AvailableRole } from 'src/app/_models/availableRole';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  users: Partial<User[]>;
  private availableRoles: AvailableRole[];

  bsModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private gridService: GridtService) { }

  ngOnInit(): void {
    this.gridService.loadSortableScripts();
    
    this.getavailableRoles()
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })    
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.roles;
    
    this.availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
  
  private getavailableRoles() {
    this.adminService.getAvailableRoles ().subscribe(roles => {
      this.availableRoles = roles;
    })
  }

  
  

}

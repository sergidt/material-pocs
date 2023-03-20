import { Component, OnInit } from '@angular/core';
import { getAllRoles } from './utils';

@Component({
    selector: 'app-roles-permissions',
    standalone: true,
    template: `
      <h4>Roles and permissions</h4>
    `,
    styles: [`
             `]
})
export class RolesAndPermissionsComponent implements OnInit {
    ngOnInit() {
        console.clear();

        console.log(getAllRoles());
    }
}

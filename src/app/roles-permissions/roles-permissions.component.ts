import { Component, OnInit } from '@angular/core';
import uniqBy from 'lodash-es/uniqBy';
import { getAllRoles, PermissionDTO } from './utils';

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

        console.log(getAllRoles().push({id: '89063f7a-ea87-491e-856b-00f08a8f74ee', claim: 'master-tenant-management-api.tenant.read'},
            {id: '89063f7a-ea87-491e-856b-00f08a8f74ee', claim: 'master-tenant-management-api.tenant.read'}));
        const distinctClaims = uniqBy(getAllRoles(),'claim');
        console.log('DistinctClaims: ', distinctClaims);
    }
}

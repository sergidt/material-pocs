import { Injectable } from '@angular/core';
import { AccessRole } from './definitions';

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    claims: any;


    currentUser() {
        return {
            user: 'User Test',
            roles: ['admin', 'imposter']
        }
    }
    hasRoles(accessRoles: AccessRole): boolean {
        this.claims = this.currentUser();
        const actualRoles: string[] = accessRoles.roles;
        if (actualRoles?.length > 0 && !!this.claims.roles) {
            if (accessRoles.operator === 'OR') {
                return actualRoles.some(r => this.claims.roles.includes(r));
            }
            return actualRoles.every(r => this.claims.roles.includes(r));
        }
        return false;
    }
}

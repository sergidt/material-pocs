import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessRole } from './definitions';
import { RolesService } from './roles-service';

@Directive({
    selector: '[requiredRole]',
    standalone: true
})
export class AccessControlDirective {

    allowedRoles!: AccessRole;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2,
        private authService: RolesService,
    ) {}

    @Input()
    set requiredRole(allowedRoles: AccessRole) {
        this.allowedRoles = allowedRoles;
        if (!this.allowedRoles || this.allowedRoles.roles.length === 0 ||
            !this.authService.currentUser) {
            this.viewContainer.clear();
            return;
        }

        const allowed:boolean = this.authService.hasRoles(this.allowedRoles)
        if (allowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    }
}
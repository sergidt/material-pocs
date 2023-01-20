import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
    selector: '[ifRights]',
    standalone: true
})
export class IfRightsDirective implements OnInit {
    @Input()
    set ifRights(rights: string[]) {
        this._allowedRights = rights || [];
    }

    private _allowedRights: Array<string> = [];

    constructor(private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit() {
        if (this._allowedRights.some(this.authService.hasRight)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

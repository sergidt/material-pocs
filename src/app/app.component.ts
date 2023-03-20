import { Component } from '@angular/core';
import { comedy } from './data';
import { Section } from './navigation-bar/navigation-bar.component';
import { AND_ROLES_OPERATOR, OR_ROLES_OPERATOR } from './rbac/definitions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    selectedIndex = -1;

    sections: Array<Section> = [
        { index: 0, name: 'Roles & Permissions' },
        { index: 1, name: 'Suspense Component' },
        { index: 2, name: 'Stepper Navigator' },
        { index: 3, name: 'Search Component' }
    ];
    data = comedy;

    OR_ROLES_OPERATOR = OR_ROLES_OPERATOR;
    AND_ROLES_OPERATOR = AND_ROLES_OPERATOR;

    manageNavigation(section: Section) {
        this.selectedIndex = section.index;
    }
}


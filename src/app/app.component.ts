import { Component } from '@angular/core';
import { comedy } from './data';
import { Section } from './navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    selectedIndex = 0;

    sections: Array<Section> = [
        { index: 0, name: 'Suspense Component' },
        { index: 1, name: 'Stepper Navigator' },
        { index: 2, name: 'Search Component' }
    ];
    data = comedy;

    manageNavigation(section: Section) {
        this.selectedIndex = section.index;
    }
}


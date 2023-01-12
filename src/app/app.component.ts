import { Component } from '@angular/core';
import { delay, interval, map, merge, of, scan, startWith, switchMap, take, tap, timer } from 'rxjs';
import { Section } from './navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    selectedIndex = 0;

    sections: Array<Section> = [
        { index: 0, name: 'Stepper Navigator' },
        { index: 1, name: 'Suspense Component' }
    ];

    loading1$ = timer(2000).pipe(map(() => false), startWith(true));

    loading2$ = of(true)
        .pipe(
            delay(1000),
            switchMap(() => interval(2000)),
            scan(acc => !acc, false),
        );

    loading$ = merge(this.loading2$);
    data$ = timer(1000).pipe(
        take(1),
        tap(console.log),
        map(() => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac justo nec ligula fermentum'.split('consectetur')));
    error$ = timer(5000).pipe(map(() => true));

    manageNavigation(section: Section) {
        this.selectedIndex = section.index;
    }
}


import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, filter, interval, map, merge, of, scan, startWith, switchMap, timer } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    loading1$ = timer(2000).pipe(map(() => false), startWith(true));

    loading2$ = of(true)
        .pipe(
            delay(5000),
            switchMap(() => interval(2000)),
            scan(acc => !acc, false),
        );

    loading$ = merge(this.loading1$, this.loading2$);

    data$ = this.loading$.pipe(filter(_ => !_), map(() => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac justo nec ligula fermentum'));
    error$ = timer(5000).pipe(map(() => true));

    constructor() {
        this.loading$.subscribe(_ => console.log('IS LOADING?', _));
    }
}


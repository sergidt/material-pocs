import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { delay, map, Observable, of, startWith } from 'rxjs';
import { StatusFeedbackContainerComponent } from '../status-feedback-container/status-feedback-container.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        AsyncPipe,
        NgForOf,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        StatusFeedbackContainerComponent
    ],
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    /** Based on the screen size, switch from standard to one column per row */
    cards = [
        {
            title: 'Users', loading$: getRandomLoading(), error$: getRandomError()
        },
        {
            title: 'Scales', loading$: getRandomLoading(), error$: getRandomError()
        },
        {
            title: 'Other devices', loading$: getRandomLoading(), error$: getRandomError()
        },
        {
            title: 'Performance', loading$: getRandomLoading(), error$: getRandomError()
        },
    ];
}

function getRandomLoading(MIN: number = 1000, MAX: number = 8000): Observable<boolean> {
    const delayTime = parseInt(`${ Math.max(MIN, Math.random() * MAX) }`);
    console.log('delay', delayTime, ' ms');

    return of(false)
        .pipe(
            delay(delayTime),
            startWith(true)
        );
}

function getRandomError(MIN: number = 1000, MAX: number = 5000): Observable<boolean> {
    const delayTime = parseInt(`${ Math.max(MIN, Math.random() * MAX) }`);

    return of(false)
        .pipe(
            delay(delayTime),
            map(() => Math.random() < 0.4)
        );
}

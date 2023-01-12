import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, concatMap, defer, delay, map, Observable, of, startWith, tap } from 'rxjs';
import { ContentViewDirective } from '../content-view.directive';
import {
    ErrorViewDirective, LoadingViewDirective, StatusFeedbackContainerComponent
} from '../suspense/status-feedback-container/status-feedback-container.component';

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
        StatusFeedbackContainerComponent,
        ContentViewDirective,
        ErrorViewDirective,
        LoadingViewDirective,
        MatProgressSpinnerModule
    ],
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    /** Based on the screen size, switch from standard to one column per row */
    cards = [
        {
            title: 'Users', streams: getRandomData()
        },
        {
            title: 'Scales', streams: getRandomData()
        },
        {
            title: 'Other devices', streams: getRandomData()
        },
        {
            title: 'Performance', streams: getRandomData()
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

function getRandomData(MIN: number = 2000,
    MAX: number = 5000): { data$: Observable<string>, loading$: Observable<boolean>, error$: Observable<boolean> } {
    const delayTime = parseInt(`${ Math.max(MIN, Math.random() * MAX) }`);
    const loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    const error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    return {
        data$: of('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac justo nec ligula fermentum scelerisque. Donec luctus auctor ipsum ut malesuada. Curabitur euismod risus quis ipsum varius, a sollicitudin odio blandit. Nullam non arcu rhoncus, imperdiet augue et, pulvinar est. Etiam hendrerit mattis eleifend. Maecenas a purus elit. Sed suscipit metus eu felis lacinia, ut vulputate urna viverra. Quisque id pharetra elit. Praesent scelerisque diam metus, et rhoncus dui vestibulum sit amet. Nulla nec ornare dui. Phasellus sit amet rutrum elit. Sed quis mauris ipsum. Duis non eros at eros consequat feugiat eu at ante. Proin ultricies lacinia euismod. Proin finibus commodo pellentesque. Mauris sed placerat ante. Vestibulum placerat commodo turpis, vel interdum diam fringilla ac. Sed rhoncus dui a sodales interdum. In rhoncus rutrum eros at accumsan. Nam tincidunt, sem sed commodo vestibulum, quam augue sodales purus, et lobortis libero felis ac justo. Pellentesque feugiat ligula blandit eros sagittis accumsan. Praesent vestibulum laoreet turpis, eu tincidunt justo mattis at. In hac habitasse platea dictumst. Aliquam tristique nulla vel libero efficitur malesuada. Quisque a posuere leo, ut vehicula leo. Donec accumsan justo sed orci elementum sollicitudin id mollis elit. Sed finibus ornare porttitor. Suspendisse mollis odio ex, nec egestas diam fringilla ut. Integer facilisis quam varius, gravida erat sit amet, mollis diam. Vivamus odio tellus, venenatis at elit in, auctor pharetra urna. Nullam ut sem arcu. Donec maximus finibus ante, a imperdiet nulla consectetur vulputate. Nam volutpat maximus augue, eget laoreet metus auctor vel. Sed finibus luctus elit, a pharetra dolor malesuada non. Vestibulum mattis vestibulum dui id hendrerit. Nam arcu ipsum, sodales non ante sed, rutrum hendrerit leo. Fusce ullamcorper auctor orci in suscipit. Ut tristique laoreet erat, non fermentum erat viverra et. Morbi sit amet elit vitae dui placerat bibendum sed ut ex. Quisque tincidunt feugiat odio quis mollis. Cras nec augue a nunc bibendum dictum. Morbi sed cursus nibh. In at rutrum nisi. In hac habitasse platea dictumst. Sed aliquam nulla enim, finibus varius augue volutpat et. Nulla facilisi. Maecenas rutrum ornare leo, vitae tincidunt mi. Aliquam molestie est quis felis lobortis, vitae gravida elit pulvinar. Praesent finibus pretium suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras maximus arcu ex, dictum viverra tortor feugiat quis. In placerat quis sem et tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut id nulla eu eros dictum aliquet eget varius nunc. Vivamus non ante quis orci vehicula scelerisque sit amet id risus. Mauris tincidunt eget nisi vitae dapibus. Nullam auctor egestas lacinia. Quisque id ex interdum, egestas enim eu, commodo ante. Pellentesque sed aliquet est. Nam vitae justo sagittis, ullamcorper ante blandit, sagittis est. Proin malesuada nulla et scelerisque luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce finibus tincidunt mauris. Nunc vitae mauris pulvinar, gravida sem id, sodales mauris. Sed vel pulvinar nisl. Vivamus scelerisque tellus tellus, eu dapibus turpis fermentum nec. Mauris ac accumsan felis. Curabitur non est felis. Cras viverra leo justo, eu viverra sapien sagittis eu.')
            .pipe(
                tap(() => loading$.next(true)),
                delay(delayTime),
                concatMap(loremIpsum => defer(() => {
                    const wordCount = parseInt(`${ Math.max(50, Math.random() * 120) }`);
                    if (wordCount > 100 && !error$.value)
                        error$.next(true);

                    return of(`${ wordCount }: ` + loremIpsum.split(' ').slice(0, wordCount).join(' '));
                })),
                tap(() => loading$.next(false))
            ),
        loading$,
        error$
    };
}

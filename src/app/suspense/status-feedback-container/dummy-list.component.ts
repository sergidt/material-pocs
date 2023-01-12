import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'dummy-list',
    standalone: true,
    imports: [
        MatListModule,
        NgForOf
    ],
    template: `

      <mat-list>
        <mat-list-item *ngFor="let str of data">
          <img matListItemAvatar
               src="assets/avatar.png">
          <h3 matListItemTitle>{{str}}</h3>
          <p matListItemLine>
            <span>{{str}}</span>
          </p>
        </mat-list-item>
      </mat-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyListComponent {
    @Input() data!: Array<string> | null;

}
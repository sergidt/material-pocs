import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-suspense-example',
    standalone: true,
    imports: [CommonModule],
    template: `
      <app-status-feedback-container
          *ngIf="selectedIndex === 0"
          [data]="data$|async"
          [loading]="loading$ | async">
        <ng-template contentView>
          <dummy-list [data]="data$ | async"></dummy-list>
        </ng-template>
      </app-status-feedback-container>
    `,
    styleUrls: ['./suspense-example.component.scss']
})
export class SuspenseExampleComponent {

}

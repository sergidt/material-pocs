import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DummyListComponent } from '../status-feedback-container/dummy-list.component';
import { ContentViewDirective, StatusFeedbackContainerComponent } from '../status-feedback-container/status-feedback-container.component';

@Component({
    selector: 'app-suspense-example',
    standalone: true,
    imports: [
        CommonModule,
        StatusFeedbackContainerComponent,
        ContentViewDirective,
        DummyListComponent,
        ContentViewDirective,
        MatButtonModule
    ],
    template: `
      <div>
        <h2>Actions</h2>
        <div class="in-line">
          <button mat-raised-button
                  (click)="manageState('Loading')"
                  color="primary">Loading
          </button>
          <button mat-raised-button
                  (click)="manageState('Show Data')">Set data
          </button>
          <button mat-raised-button
                  (click)="manageState('Error')"
                  color="warn">Error
          </button>
        </div>

        <div class="in-line">
          <h4>State:</h4>
          <h4>{{state}}</h4>
        </div>
      </div>

      <div>
        <h2>Suspense component</h2>

        <app-status-feedback-container
            [data]="data"
            [loading]="loading"
            [error]="error">
          <ng-template contentView>
            <dummy-list [data]="data"></dummy-list>
          </ng-template>
        </app-status-feedback-container>
      </div>
    `,
    styles: [`
               :host {
                 display: flex;
                 gap: 100px;
               }

               .in-line {
                 margin-bottom: 30px;
                 display: flex;
                 gap: 20px;
               }
             `]
})
export class SuspenseExampleComponent {
    data!: Array<string> | null;
    loading!: boolean | null;
    error!: boolean | null;

    state: 'None' | 'Loading' | 'Show Data' | 'Error' = 'None';

    manageState(value: 'None' | 'Loading' | 'Show Data' | 'Error') {
        this.state = value;

        switch (value) {
            case 'Loading':
                this.loading = true;
                break;

            case 'Show Data':
                this.data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac justo nec ligula fermentum'.split('consectetur');
                this.error = false;
                this.loading = false;
                break;

            case 'Error':
                this.error = true;
                break;
        }
    }
}

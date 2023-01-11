import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'loading-spinner',
    standalone: true,
    imports: [
        MatProgressSpinnerModule
    ],
    template: `
      <mat-spinner
          color="accent"></mat-spinner>
    `,
    styles: [`
               :host {
                 display: flex;
                 align-items: center;
                 justify-content: center;
               }
             `]
})
export class LoadingComponent {
}
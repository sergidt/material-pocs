import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-application-shell',
    standalone: true,
    imports: [CommonModule],
    template: `
      <div class="main-container mat-elevation-z20">
        <div class="menu"></div>
        <div class="header mat-elevation-z4">
          <img src="assets/bizerba-logo.png"/>
        </div>
        <div class="main-content">
          <ng-content></ng-content>
        </div>
        <div class="footer"></div>
      </div>
    `,
    styleUrls: ['./application-shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationShellComponent {

}

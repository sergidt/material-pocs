import { Component } from '@angular/core';

@Component({
    selector: 'skeleton',
    standalone: true,
    imports: [],
    template: `
      <img src="assets/skeleton.jpg">
    `,
    styles: [`
               @keyframes fadein {
                 0% {
                   opacity: 0;
                 }
                 50% {
                   opacity: 1;
                 }
                 100% {
                   opacity: 0;
                 }
               }

               :host {
                 display: flex;
                 justify-content: center;
                 position: absolute;
                 align-items: center;

                 animation: fadein 1.5s infinite;
               }
             `]
})
export class SkeletonComponent {
}
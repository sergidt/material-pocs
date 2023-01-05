import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, HostListener, inject, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Directive({
    selector: '[appScrollSection]',
    standalone: true
})
export class ScrollSectionDirective {
    @Input('appScrollSection') id!: string;

    private host = inject(ElementRef<HTMLElement>);
    private manager = inject(ScrollManagerDirective);

    ngOnInit() {
        this.manager.register(this);
    }

    ngOnDestroy() {
        this.manager.remove(this);
    }

    scroll() {
        this.host.nativeElement.scrollIntoView({
            behavior: 'smooth',
        });
    }
}

@Directive({
    selector: '[appScrollAnchor]',
    standalone: true
})
export class ScrollAnchorDirective {
    @Input('appScrollAnchor') id!: string;

    constructor(private manager: ScrollManagerDirective) {
    }

    @HostListener('click')
    scroll() {
        this.manager.scrollById(this.id);
    }
}

@Directive({
    selector: '[appScrollManager]',
    exportAs: 'scrollManager',
    standalone: true
})
export class ScrollManagerDirective {
    private _sections = new Map<string, ScrollSectionDirective>();

    get sections() {
        return Array.from(this._sections.keys());
    }

    scrollById(id: string) {
        this._sections.get(id)!.scroll();
    }

    scrollByIndex(index: number) {
        Array.from(this._sections.values()).at(index)?.scroll();
    }

    register(section: ScrollSectionDirective) {
        this._sections.set(section.id, section);
    }

    remove(section: ScrollSectionDirective) {
        this._sections.delete(section.id);
    }
}

@Component({
    selector: 'app-stepper-navigator',
    standalone: true,
    imports: [CommonModule,
              MatExpansionModule,
              MatChipsModule,
              MatIconModule,
              MatTabsModule,
              ScrollSectionDirective,
              ScrollManagerDirective,
              ScrollAnchorDirective, MatRippleModule,],
    templateUrl: './stepper-navigator.component.html',
    styleUrls: ['./stepper-navigator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperNavigatorComponent {
    trace(event: any) {
        console.log(event);
    }

}

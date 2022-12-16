import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-selected-items',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatRippleModule],
    templateUrl: './selected-items.component.html',
    styleUrls: ['./selected-items.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedItemsComponent implements AfterViewInit {

    @ViewChild('menu') private menu!: MatMenu;

    icon = 'expand_more';

    selectedItems = [
        '267400 / Mercadona / Supermaket .',
        '653518 / Binford Ltd. / Supermaket ',
        '267400 / Acme Co. / Supermaket ',
        '653518 / Mercadona / Supermaket .'
    ];

    ngAfterViewInit(): void {
    }

    toggleIcon(opened: boolean) {
        this.icon = opened ? 'expand_less' : 'expand_more';
    }
}

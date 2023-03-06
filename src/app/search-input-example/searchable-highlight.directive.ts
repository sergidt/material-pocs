import { AfterViewInit, Directive, ElementRef, Inject, Input, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { startWith } from 'rxjs';
import { SearchInputListComponent } from './search-input-list/search-input-list.component';

const PATTERN = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

@Directive({
    selector: '[searchableHighlight]',
    standalone: true
})
export class SearchableHighlightDirective implements AfterViewInit {
    @Input() searchableHighlight!: string;

    constructor(private sanitizer: DomSanitizer, private host: ElementRef,
        @Inject(SearchInputListComponent) @Optional() private searchInput: SearchInputListComponent) {
    }

    ngAfterViewInit() {
        if (this.searchInput) {
            this.searchInput.searchTerm$
                .pipe(startWith(''))
                .subscribe(term => this.highlight(term));
        }
    }

    highlight(searchTerm: string) {
        this.host.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.resolve(this.searchableHighlight, searchTerm));
    }

    resolve(token: string, searchTerm: string) {
        const cleanSearch = searchTerm.replace(PATTERN, '\\$&')
                                      .split(' ')
                                      .filter(t => t.length > 0)
                                      .join('|');

        const regex = new RegExp(cleanSearch, 'gi');

        return cleanSearch ? token.replace(regex, match => `<span class="highlight">${ match }</span>`) : token;
    }
}

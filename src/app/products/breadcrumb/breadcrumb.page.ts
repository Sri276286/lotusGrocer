import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'lotus-breadcrumb',
    templateUrl: 'breadcrumb.page.html',
    styleUrls: ['breadcrumb.page.scss']
})
export class BreadcrumbPage implements OnChanges {
    @Input() breadcrumb;

    ngOnChanges(change: SimpleChanges) {
        if (change && change['breadcrumb']) {
            this.breadcrumb = change['breadcrumb'].currentValue;
        }
    }
}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'lotus-subcateg',
    templateUrl: 'subcateg-list.page.html',
    styleUrls: ['subcateg-list.page.scss']
})
export class SubCategListPage {
    @Input() subcateg;
}
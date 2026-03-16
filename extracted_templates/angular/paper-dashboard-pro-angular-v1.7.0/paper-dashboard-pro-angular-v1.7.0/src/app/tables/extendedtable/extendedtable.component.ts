import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;


@Component({
    selector: 'extended-table-cmp',
    templateUrl: 'extendedtable.component.html'
})

export class ExtendedTableComponent implements OnInit{

    ngOnInit(){
    }

    ngAfterViewInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
}

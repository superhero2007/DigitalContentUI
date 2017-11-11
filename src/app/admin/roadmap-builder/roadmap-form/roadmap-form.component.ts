import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {RoadmapItemInterface, RoadmapItem} from "@app/admin/roadmap-builder/roadmap-builder.interface";

import { DatepickerOptions } from 'ng2-datepicker';

declare var moment;

@Component({
    selector: 'app-roadmap-form',
    templateUrl: './roadmap-form.component.html',
    styleUrls: ['./roadmap-form.component.scss']
})

export class RoadmapFormComponent implements OnInit {

    @Input() data;
    @Output() onSave:EventEmitter<string> = new EventEmitter();
    @Output() onCancel:EventEmitter<string> = new EventEmitter();

    public options: DatepickerOptions;
    public editMode: boolean;
    public dataCopy : any = {};

    constructor() {}

    ngOnInit() {

        Object.assign(this.dataCopy, this.data);

        if(!this.dataCopy || !this.dataCopy.title) {
            this.dataCopy = new RoadmapItem('', '');
        }

        this.options =  {
            minYear: 2000,
            maxYear: 2030,
            displayFormat: 'MMMM YYYY',
            barTitleFormat: 'MMMM YYYY',
            firstCalendarDay: 1
        };
    }

    save() {
        this.onSave.emit(this.dataCopy);
    }

    cancel() {
        this.data = this.dataCopy;
        this.onCancel.emit();
    }

}

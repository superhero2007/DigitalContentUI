import { Component, OnInit } from '@angular/core';
import {RoadmapItemInterface, RoadmapItem} from './roadmap-builder.interface'
import { RoadMapService } from './roadmap-builder.service';

declare var moment;

@Component({
    selector: 'app-roadmap-builder',
    templateUrl: './roadmap-builder.component.html',
    styleUrls: ['./roadmap-builder.component.scss']
})
export class RoadmapBuilderComponent implements OnInit {
    newRoadMapItem : RoadmapItemInterface;
    public selectedRoadMap: any;
    addEditMode : boolean = false;
    editMode : boolean = false;
    editableIndex : number;
    public roadMap : Array<RoadmapItemInterface>;

    constructor(public RoadMapService: RoadMapService) {}

    ngOnInit() {

        this.RoadMapService.getData();
        this.roadMap = this.RoadMapService.data;

        if(!this.roadMap.length) this.addOrEdit();
    }

    addOrEdit(item? : any, index? : number) {
        this.editMode = item ? true : false;
        this.editableIndex = index;
        this.addEditMode = !this.addEditMode;
        this.selectedRoadMap = item ? item : new RoadmapItem('', '');
    }

    save(data : RoadmapItemInterface, x) {

        if(data.includeFeatureYears) {
            data.date = moment(data.date).format('YYYY');
        } else {
            data.date = moment(data.date).format('MMMM YYYY');
        }

        if(!this.editMode) {
            //TODO: add API call afte backend ready;
            this.roadMap.push(data);
        } else {
            //TODO: add API call afte backend ready;
            this.roadMap[this.editableIndex] = data;
        }

        this.cancel();
    }

    remove(ind) {
        //TODO: add API call afte backend ready;

        this.roadMap.splice(ind, 1);

    }

    cancel() {
        this.addEditMode = false;
        this.selectedRoadMap = null;
    }

    moveItem(direction, index) {
        let _item = this.roadMap[index];
        if(direction == 'up') {
            this.roadMap.splice(index-1, 0, this.roadMap.splice(index, 1)[0]);
        } else {
            this.roadMap.splice(index+1, 0, this.roadMap.splice(index, 1)[0]);
        }
    }
}

import { Component, Injector, ViewChild, OnInit, NgZone, HostListener } from '@angular/core';
import * as $jQuery from 'jquery';

declare var WorkflowDesignerConstants : any;
declare var WorkflowDesigner : any;
declare var selectSchemeType : any;

@Component({
    selector: 'workflowDesigner',
    templateUrl: './workflowdesigner.html',
    styleUrls: ['./workflowdesigner.css']
})
export class WorkFlowDesigner {

     schemecode : string = 'SimpleWF';
     processid : any;
     graphwidth : any = window.innerWidth;
     graphheight : number = 600;
     wfdesigner  : any;

    @HostListener('window:resize', ['$event'])
    onResize(event){
            var w = event.target.innerHeight;
            var h = event.target.innerWidth;
             if (w > 300)
                this.graphwidth = w - 80;

            if (h > 300)
                this.graphheight = h - 200;

            this.wfdesignerRedraw();
    }


    wfdesignerRedraw() {
        var data;
        if (this.wfdesigner != undefined) {
            data = this.wfdesigner.data;
            this.wfdesigner.destroy();
        }
         WorkflowDesignerConstants.FormMaxHeight = 600;
        this.wfdesigner = new WorkflowDesigner({
            name: 'simpledesigner',
            apiurl: 'http://dcapi.stillwaters.io/Designer/API',
            renderTo: 'wfdesigner',
            imagefolder: '/assets/common/images/',
            graphwidth: this.graphwidth,
            graphheight: this.graphheight
        });

        if (this.processid != undefined && this.processid !== '')
            this.wfdesigner.readonlymode();

        if (data == undefined) {
            var p = { schemecode: this.schemecode, processid: this.processid };
            if (this.wfdesigner.exists(p))
                this.wfdesigner.load(p);
            else
                this.wfdesigner.create();
        }
        else {
            this.wfdesigner.data = data;
            this.wfdesigner.render();
        }
    }


    DownloadScheme(){
        this.wfdesigner.downloadscheme();
    }

     DownloadSchemeBPMN() {
        this.wfdesigner.downloadschemeBPMN();
    }


    SelectScheme(type) {
        if (type)
            selectSchemeType = type;

        var file = $('#uploadFile');
        file.trigger('click');
    }

    UploadScheme() {

        if (selectSchemeType == "bpmn") {
            this.wfdesigner.uploadschemeBPMN($('#uploadform')[0], function () {
            this.wfdesigner.autoarrangement();
                alert('The file is uploaded!');
            });
        }
        else {
            this.wfdesigner.uploadscheme($('#uploadform')[0], function () {
                alert('The file is uploaded!');
            });
        }
    }

    OnSave() {
        this.wfdesigner.schemecode = this.schemecode;

        var err = this.wfdesigner.validate();
        if (err != undefined && err.length > 0) {
            alert(err);
        }
        else {
            this.wfdesigner.save(function () {
                alert('The scheme is saved!');
            });
        }
    }
     OnNew() {
        this.wfdesigner.create();
    }


    ngOnInit(){
        this.wfdesignerRedraw();
    //      QueryString  = function (): any  {
    //     // This function is anonymous, is executed immediately and
    //     // the return value is assigned to QueryString!
    //     var query_string = {};
    //     var query = window.location.search.substring(1);
    //     var vars = query.split("&");
    //     for (var i = 0; i < vars.length; i++) {
    //         var pair = vars[i].split("=");
    //         // If first entry with this name
    //         if (typeof query_string[pair[0]] === "undefined") {
    //             query_string[pair[0]] = pair[1];
    //             // If second entry with this name
    //         } else if (typeof query_string[pair[0]] === "string") {
    //             var arr = [query_string[pair[0]], pair[1]];
    //             query_string[pair[0]] = arr;
    //             // If third or later entry with this name
    //         } else {
    //             query_string[pair[0]].push(pair[1]);
    //         }
    //     }
    //     return query_string;
    // };

}

}

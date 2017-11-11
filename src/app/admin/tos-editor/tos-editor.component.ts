import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged';

import {TosEditorService} from "@app/admin/tos-editor/tos-editor.service";

@Component({
    selector: 'app-tos-editor',
    templateUrl: './tos-editor.component.html',
    styleUrls: ['./tos-editor.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TosEditorComponent  implements OnInit {

    tos: any = {
        tosContent: ''
    };

    constructor(public TosEditorService : TosEditorService) {}

    @ViewChild('editor') editor: QuillEditorComponent;

    ngOnInit() {
        this.TosEditorService.getData();
        this.tos = this.TosEditorService.data;
    }

    save() {
        this.TosEditorService.save({
            tosContent : this.tos.tosContent
        })
    }

    cancel() {
        this.TosEditorService.getData();
    }

    reset() {
       this.TosEditorService.reset();
    }
}

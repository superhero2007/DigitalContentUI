import {Component, ViewChild, Injector, Output, EventEmitter, ElementRef, Input} from '@angular/core';
import {ModalDirective, BsModalRef} from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/common/app-component-base';
import {TosModalService} from "@app/shared/layout/tos-modal.service";

@Component({
    selector: 'tosModal',
    templateUrl: './tos-modal.component.html',
    styleUrls: ['./tos-modal.scss'],
})
export class TosModalComponent extends AppComponentBase {

    @ViewChild('tosModal') modal: ModalDirective;
    @Output() onAccept: EventEmitter<any> = new EventEmitter<any>();
    @Input() tos : any;

    public active: boolean = false;
    public saving: boolean = false;
    public modalHeight : any = (window as any).innerHeight - 180;
    public scrolledToBottom : any = false;

    constructor(
        private TosModalService: TosModalService,
        injector: Injector
    ) {
        super(injector);
    }

    show(): void {
        this.modal.show();
        this.active = true;
        $('body').addClass('tos-modal-open');
    }

    close(): void {
        this.active = false;
        this.modal.hide();
        $('body').removeClass('tos-modal-open');
    }

    save(): void {
        this.saving = true;

        this.TosModalService.accept().subscribe(() => {
            $('body').removeClass('tos-modal-open');
            this.saving = false;
            this.modal.hide();
        })
    }

    onShown() {
        this.modalHeight = (window as any).innerHeight - 180;
    }

    public onScroll() {

        let element = document.getElementById('scrollRef');

        let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

        if(atBottom && !this.scrolledToBottom) {
            this.scrolledToBottom = true;
        }

    }
}

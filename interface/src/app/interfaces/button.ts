import { EventEmitter } from "@angular/core";

export class Button {
    emitter!: EventEmitter<any>;
    param: any = null;
    label: string = '';
    color_class: string = 'primary';

    constructor(label: string, param: any, emitter: EventEmitter<any>, color: string  = 'primary') {
        this.label = label;
        this.param = param;
        this.emitter = emitter;
        if (color) {
            this.color_class = color;
        }
    }
}
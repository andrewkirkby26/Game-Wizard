import { EventEmitter } from "@angular/core";
import { Button } from "./button";

export class Dialog {
    name: string | null = null;
    title: string = '';
    content: string = '';
    buttons: Button[] = [];
    data: any = {};

    constructor(title: string = '', content: string = '', buttons: Button[] = []) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
    }
}
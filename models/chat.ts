import {Base} from "./base";

export class Chat extends Base {

    messages: Message[] = [];

    constructor(c: any) {
        super();

        if (c) {
            this.messages = [];
            if (c.messages) {
                //@ts-ignore
                c.messages.forEach((m) => {
                    this.messages.push(new Message(m));
                })
            }
        }
    }

    override toJSON(): any {
        let o = super.toJSON();

        o.messages = [];
        this.messages.forEach((m) => {
            o.messages.push(m.toJSON());
        })

        return o;
    }
}

export class Message extends Base{
    text: string = '';
    authorUserId: string | null = null;
    createTime: number = 0;

    constructor(c: any) {
        super();
        if (c) {
            this.createTime = c.createTime ? c.createTime : new Date().getTime();
            this.text = c.text;
            if (c.authorUserId) {
                this.authorUserId = c.authorUserId;
            }
        }
    }

    isNotification(): boolean {
        return this.authorUserId == null;
    }
}


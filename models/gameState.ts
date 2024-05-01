import {Base} from "./base";

export class GameState extends Base {

    static PREPARING = 'Preparing';
    static ACTIVE = 'Active';
    static COMPLETE = 'Complete';

    state: string = GameState.PREPARING;
    userMessage: UserMessage = new UserMessage(null);

    constructor(c: any) {
        super();

        if (c) {
            this.state = c.state ? c.state : GameState.PREPARING;
            this.userMessage = new UserMessage(c.userMessage);
        }
    }

    isPreparing() {
        return GameState.PREPARING == this.state;
    }

    isActive() {
        return GameState.ACTIVE == this.state;
    }

    isComplete() {
        return GameState.COMPLETE == this.state;
    }

    getUserMessage(): string {
        return this.userMessage.text + '.';
    }

    setUserMessage(text: string) {
        this.userMessage = new UserMessage({
            text: text
        })
    }

    override toJSON(): any {
        let o = super.toJSON();

        o.userMessage = this.userMessage.toJSON()

        return o
    }
}

export class UserMessage extends Base{
    text: string = '';

    constructor(c: any) {
        super();
        if (c) {
            this.text = c.text;
        }
    }
}



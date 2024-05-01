export class Snackbar {

    level: string = 'good';
    message: string = '';
    action: string | undefined;
    config: any | undefined;

    constructor(message: string, action: string | null, config: any | null, level = 'good') {
        this.message = message;
        this.level = level;
        if (action) {
            this.action = action;
        }
        if (config){
            this.config = config;
        }
    }
}

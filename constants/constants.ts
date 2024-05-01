import {Card} from "../models/card";

export class Constants {
    static UI_STORAGE_VARIABLE_PREFIX = 'Wizard'

    //Screen Sizes
    static SCREEN_SIZE_SMALL = 'Small';
    static SCREEN_SIZE_MEDIUM = 'Medium';
    static SCREEN_SIZE_LARGE = 'Large';

    static DIALOG_LOGIN = 'Login';
    static DIALOG_LOGOUT = 'Logout';
    static DIALOG_NEW_GAME = 'New Game';
    static DIALOG_VIEW_INVITE = 'View Invite';
    static DIALOG_BET = 'Bet';
    static DIALOG_DISCARD= ' Discard';
    static DIALOG_COLOR_CHOOSE = 'ColorTrump';

    static CPU_MOVE_DELAY = 2000;

    static CPU = 'CPU';

    static COLLECTION_USERS = 'Users';
    static COLLECTION_GAMES = 'Games';

    static SNACKBAR_GOOD = 'good';
    static SNACKBAR_WARN = 'warn';
    static SNACKBAR_ERROR = 'error';

    static USER_LEVEL_USER = 'ROLE_USER';
    static USER_LEVEL_ADMIN = 'ROLE_ADMIN';

    //Routes
    static ROUTE_HOME = 'home';
    static ROUTE_GAME = 'game';

    static DECK: Card[] = [
        new Card({value: Card.WIZARD}),
        new Card({value: Card.WIZARD}),
        new Card({value: Card.WIZARD}),
        new Card({value: Card.WIZARD}),

        new Card({value: Card.NAN}),
        new Card({value: Card.NAN}),
        new Card({value: Card.NAN}),
        new Card({value: Card.NAN}),

        new Card({value: 1, color: Card.COLOR_BLUE}),
        new Card({value: 2, color: Card.COLOR_BLUE}),
        new Card({value: 3, color: Card.COLOR_BLUE}),
        new Card({value: 4, color: Card.COLOR_BLUE}),
        new Card({value: 5, color: Card.COLOR_BLUE}),
        new Card({value: 6, color: Card.COLOR_BLUE}),
        new Card({value: 7, color: Card.COLOR_BLUE}),
        new Card({value: 8, color: Card.COLOR_BLUE}),
        new Card({value: 9, color: Card.COLOR_BLUE}),
        new Card({value: 10, color: Card.COLOR_BLUE}),
        new Card({value: 11, color: Card.COLOR_BLUE}),
        new Card({value: 12, color: Card.COLOR_BLUE}),
        new Card({value: 13, color: Card.COLOR_BLUE}),

        new Card({value: 1, color: Card.COLOR_RED}),
        new Card({value: 2, color: Card.COLOR_RED}),
        new Card({value: 3, color: Card.COLOR_RED}),
        new Card({value: 4, color: Card.COLOR_RED}),
        new Card({value: 5, color: Card.COLOR_RED}),
        new Card({value: 6, color: Card.COLOR_RED}),
        new Card({value: 7, color: Card.COLOR_RED}),
        new Card({value: 8, color: Card.COLOR_RED}),
        new Card({value: 9, color: Card.COLOR_RED}),
        new Card({value: 10, color: Card.COLOR_RED}),
        new Card({value: 11, color: Card.COLOR_RED}),
        new Card({value: 12, color: Card.COLOR_RED}),
        new Card({value: 13, color: Card.COLOR_RED}),

        new Card({value: 1, color: Card.COLOR_YELLOW}),
        new Card({value: 2, color: Card.COLOR_YELLOW}),
        new Card({value: 3, color: Card.COLOR_YELLOW}),
        new Card({value: 4, color: Card.COLOR_YELLOW}),
        new Card({value: 5, color: Card.COLOR_YELLOW}),
        new Card({value: 6, color: Card.COLOR_YELLOW}),
        new Card({value: 7, color: Card.COLOR_YELLOW}),
        new Card({value: 8, color: Card.COLOR_YELLOW}),
        new Card({value: 9, color: Card.COLOR_YELLOW}),
        new Card({value: 10, color: Card.COLOR_YELLOW}),
        new Card({value: 11, color: Card.COLOR_YELLOW}),
        new Card({value: 12, color: Card.COLOR_YELLOW}),
        new Card({value: 13, color: Card.COLOR_YELLOW}),

        new Card({value: 1, color: Card.COLOR_GREEN}),
        new Card({value: 2, color: Card.COLOR_GREEN}),
        new Card({value: 3, color: Card.COLOR_GREEN}),
        new Card({value: 4, color: Card.COLOR_GREEN}),
        new Card({value: 5, color: Card.COLOR_GREEN}),
        new Card({value: 6, color: Card.COLOR_GREEN}),
        new Card({value: 7, color: Card.COLOR_GREEN}),
        new Card({value: 8, color: Card.COLOR_GREEN}),
        new Card({value: 9, color: Card.COLOR_GREEN}),
        new Card({value: 10, color: Card.COLOR_GREEN}),
        new Card({value: 11, color: Card.COLOR_GREEN}),
        new Card({value: 12, color: Card.COLOR_GREEN}),
        new Card({value: 13, color: Card.COLOR_GREEN})
    ]

}

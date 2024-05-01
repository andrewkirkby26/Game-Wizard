import {NavigationService} from "../app/services/navigation.service";
import {GameService} from "../app/services/game.service";

export const environment = {
  production: true,
  name: 'Wizard',
  realm: 'production',
  lang: 'en-us',
  version: '-',
  gameService: ({} as GameService)
};

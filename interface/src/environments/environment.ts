// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {NavigationService} from "../app/services/navigation.service";
import {GameService} from "../app/services/game.service";
import {Game} from "../../../models/game";

export const environment = {
  production: false,
  name: 'Wizard',
  realm: 'development',
  lang: 'en-us',
  version: '-',
  gameService: ({} as GameService)
};

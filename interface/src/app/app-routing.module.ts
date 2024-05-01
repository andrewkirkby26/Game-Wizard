import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '../../../constants/constants';
import { HomePageComponent } from './components/pages/home/home.component';
import { AuthGuard } from './services/authGuard.service';
import {GamePageComponent} from "./components/pages/game/game.component";

const routes: Routes = [
  //Common
  {path: Constants.ROUTE_HOME, component: HomePageComponent},
  {path: Constants.ROUTE_GAME, component: GamePageComponent},
  //Required
  {path: '', redirectTo: '/' + Constants.ROUTE_HOME, pathMatch: 'full'},
  {path: '**',   redirectTo: '/' + Constants.ROUTE_HOME}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EventsComponent } from './views/events/events.component';
import { EventMapComponent } from './views/event-map/event-map.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { UserComponent } from './views/user/user.component';
import { FavouritesComponent } from './views/favourites/favourites.component';
import { PrivacityPageComponent } from './views/privacity-page/privacity-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component:  EventsComponent},
    { path: 'maps', component:  EventMapComponent},
    { path: 'login', component:  LoginComponent},
    { path: 'register', component:  RegisterViewComponent},
    { path: 'user', component:  UserComponent},
    { path: 'favourites', component:  FavouritesComponent},
    { path: 'privacity', component:  PrivacityPageComponent},
];

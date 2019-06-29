import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {EntryListComponent} from './entry-list/entry-list.component';
import {EntryComponent} from './entry/entry.component';
import {EntryDetailsComponent} from './entry-details/entry-details.component';
import {MapsComponent} from './maps/maps.component';

const routes: Routes = [
  { path: '', component: EntryListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'entry-details', component: EntryDetailsComponent},
  { path: 'map', component: MapsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule, MatTableModule, MatExpansionModule, MatDialogModule, MatSortModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AppMaterialModule} from './app-material/app-material.module';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry/entry.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {EntryDetailsComponent} from './entry-details/entry-details.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { AgmCoreModule } from '@agm/core';
import { MapsComponent } from './maps/maps.component';
import {HttpClientModule} from '@angular/common/http';
import {EntriesService} from './entries.service';
import {StatusPipe} from './entry-list/status-pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {UploadService} from './upload.service';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryListComponent,
    EntryComponent,
    EntryDetailsComponent,
    CreateNoteComponent,
    MapsComponent,
    StatusPipe,
    PageNotFoundComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    MatMenuModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    ExtendedModule,
    FlexModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatSortModule,
    HttpClientModule,
    AppRoutingModule,
    AmplifyAngularModule
  ],
  providers: [AuthService, EntriesService, UploadService],
  bootstrap: [AppComponent],
  entryComponents: [CreateNoteComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbarModule} from '@angular/material';
import { PersonComponent } from './page/person/person.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path : 'person', component: PersonComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PersonComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

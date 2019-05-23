import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSliderModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { PersonComponent } from './page/person/person.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ComparisonComponent } from './component/test/comparison/comparison.component';
import { TestComponent } from './page/test/test.component';
import { VerificationComponent } from './component/test/verification/verification.component';

import 'hammerjs';
import { QuestionComponent } from './page/question/question.component';
import { YesnoComponent } from './component/question/yesno/yesno.component';
import { Compar2Component } from './component/question/compar2/compar2.component';
import { UtilityComponent } from './component/question/utility/utility.component';
import { Compar3Component } from './component/question/compar3/compar3.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path : 'person', component: PersonComponent},
  {path: 'test/:id', component: TestComponent},
  {path: 'question/:id', component: QuestionComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PersonComponent,
    HomeComponent,
    ComparisonComponent,
    TestComponent,
    VerificationComponent,
    QuestionComponent,
    YesnoComponent,
    Compar2Component,
    UtilityComponent,
    Compar3Component
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
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatSliderModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    HttpClientModule,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

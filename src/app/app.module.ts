import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestParsingComponent } from './attacks-edit/test-parsing/test-parsing.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './http.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { AttacksListComponent } from './attacks-edit/attacks-list/attacks-list.component';
import { AttacksEditComponent } from './attacks-edit/attacks-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TestParsingComponent,
    AttacksListComponent,
    AttacksEditComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

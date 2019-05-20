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
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ClockComponent } from './shared/clock/clock.component';
import { CrossTableComponent } from './cross-table/cross-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TestParsingComponent,
    AttacksListComponent,
    AttacksEditComponent,
    HeaderComponent,
    SidenavListComponent,
    ClockComponent,
    CrossTableComponent
  ],
  imports: [
    FlexLayoutModule,
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

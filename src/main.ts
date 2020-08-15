import './polyfills';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {TableComponent} from './app/table/table.component';
import { InlineEditComponent } from './app/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { StepperComponent } from './app/stepper/stepper.component';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { ImportComponent } from './app/uploadFile/import.component';
import { ProgressComponent } from './app/uploadFile/progress/progress.component';
import { DndDirective } from './app/uploadFile/dnd.directive';
import { DialogComponent } from './app/dialog/dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DemoMaterialModule } from './material-module';
import { SideNavComponent } from './app/sidenav/side-nav.component';
import { SettingsTableComponent } from './app/settings/settings-table.component';
import { SettingsDialogComponent } from './app/settings/settings-dialog/settings-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SatPopoverModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule
  ],
  entryComponents: [
    StepperComponent,
    SideNavComponent
  ],
  declarations: [
    InlineEditComponent,
    StepperComponent,
    TableComponent,
    ImportComponent,
    ProgressComponent,
    DndDirective,
    DialogComponent,
    SettingsDialogComponent,
    SideNavComponent,
    SettingsTableComponent
  ],
  bootstrap: [
    SideNavComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


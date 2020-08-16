import './polyfills';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { InlineEditComponent } from './app/stepper/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { StepperComponent } from './app/stepper/stepper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImportComponent } from './app/stepper/import-page/import.component';
import { ProgressComponent } from './app/stepper/import-page/progress-bar/progress.component';
import { DndDirective } from './app/stepper/import-page/dnd.directive';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DemoMaterialModule } from './material-module';
import { SideNavComponent } from './app/sidenav/side-nav.component';
import { SettingsTableComponent } from './app/settings/settings-table.component';
import { SettingsDialogComponent } from './app/common/settings-dialog/settings-dialog.component';
import { TableComponent } from './app/stepper/table/table.component';

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


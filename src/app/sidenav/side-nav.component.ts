import { Component, OnInit } from "@angular/core";

@Component({
  selector: "side-nav",
  templateUrl: "side-nav.component.html",
  styleUrls: ["side-nav.component.css"],
})
export class SideNavComponent {
  isMainPageVisible: boolean = true;
  isSettingsVisible: boolean = false;
  isMappingVisible: boolean = false;
  isLabelsPageVisible: boolean = false;
  isOrdersPageVisible: boolean = false;
  isMydataImportPageVisible: boolean = false;
  isMyDataCancelPageVisible: boolean = false;

  showMainPage() {
    this.isMainPageVisible = true;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isMyDataCancelPageVisible = false;
  }

  showSettings() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = true;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isMyDataCancelPageVisible = false;
  }

  showMappings() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isLabelsPageVisible = false;
    this.isMappingVisible = true;
    this.isOrdersPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isMyDataCancelPageVisible = false;
  }

  showLabelsPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = true;
    this.isOrdersPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isMyDataCancelPageVisible = false;
  }

  showCreateOrderPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isOrdersPageVisible = true;
    this.isMyDataCancelPageVisible = false;
  }

  showMydataImportPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
    this.isMyDataCancelPageVisible = false;
    this.isMydataImportPageVisible = true;
  }
  showMyDataCancelPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
    this.isMydataImportPageVisible = false;
    this.isMyDataCancelPageVisible = true;
  }
}

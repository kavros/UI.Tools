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

  showMainPage() {
    this.isMainPageVisible = true;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
  }

  showSettings() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = true;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = false;
  }

  showMappings() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isLabelsPageVisible = false;
    this.isMappingVisible = true;
    this.isOrdersPageVisible = false;
  }

  showLabelsPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = true;
    this.isOrdersPageVisible = false;
  }

  showCreateOrderPage() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
    this.isLabelsPageVisible = false;
    this.isOrdersPageVisible = true;
  }
}

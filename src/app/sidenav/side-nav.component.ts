import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.css'],
})

export class SideNavComponent implements OnInit {
  isMainPageVisible = true;
  isSettingsVisible = false;
  isMappingVisible = false;

  ngOnInit(): void {
  }


  showMainPage() {
    this.isMainPageVisible = true;
    this.isSettingsVisible = false;
    this.isMappingVisible = false;
  }

  showSettings() {
    this.isMainPageVisible = false;
    this.isSettingsVisible = true;
    this.isMappingVisible = false;
  }

  showMappings(){
    this.isMainPageVisible = false;
    this.isSettingsVisible = false;
    this.isMappingVisible = true;
  }

}

import {Component} from '@angular/core';


@Component({
  selector: 'side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.css'],
})

export class SideNavComponent {
  isMainPageVisible = true;


  showMainPage() {
    this.isMainPageVisible = true;
  }

  showSettings() {
    this.isMainPageVisible = false;
  }
}

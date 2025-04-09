import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentPage: string = '';
  breadcrumbs: string[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageInfo(event.url);
      }
    });
  }

  ngOnInit() {
    this.updatePageInfo(this.router.url);
  }

  updatePageInfo(url: string) {
    // Remove leading slash and split path
    const paths = url.substring(1).split('/');

    // Set current page title
    switch (paths[0]) {
      case 'banners':
        this.currentPage = 'Banner List';
        this.breadcrumbs = ['Notification', 'Banner List'];
        break;
      case 'create-banner':
        this.currentPage = 'Create Banner';
        this.breadcrumbs = ['Notification', 'Create Banner'];
        break;
      case 'banner-detail':
        this.currentPage = 'Banner Detail';
        this.breadcrumbs = ['Notification', 'Banner Detail'];
        break;
      case 'edit-banner':
        this.currentPage = 'Edit Banner';
        this.breadcrumbs = ['Notification', 'Edit Banner'];
        break;
      default:
        this.currentPage = '';
        this.breadcrumbs = [];
    }
  }

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

const MOCK_DATA = {
  "meta": {
    "response_datetime": "2025/04/07, 20:11:10",
    "response_desc": "success",
    "response_code": 20000,
    "response_data": [
      {
        "id": 1,
        "page": 1,
        "type": "banner",
        "video": null,
        "image": "https://f.ptcdn.info/701/081/000/s10i9m204kbPRd9r4lpZ2-o.jpg",
        "title": "",
        "description": "",
        "create_at": "2024-09-11T14:38:22.372150+07:00",
        "create_by": "superadmin charge24",
        "check_publish_button": 1,
        "publish_start": "2024-09-13T09:53:22.428000+07:00",
        "publish_end": "2029-09-13T00:00:22.428000+07:00",
        "user_received": "alluser",
        "last_update_at": "2024-09-13T09:53:22.730201+07:00",
        "last_update_by": "Admin Charge24",
        "status": "publish",
        "check_nav_button": 1,
        "nav_to": "Test",
        "view": 1,
        "click": 0,
        "operator": "charge24"
      },
      {
        "id": 2,
        "page": 2,
        "type": "banner",
        "video": null,
        "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/youtube-live-thumbnail-for-gaming-design-template-06e4210a79a26bc99a52e0374f01663d_screen.jpg?ts=1633602824",
        "title": "",
        "description": "",
        "create_at": "2024-11-19T14:08:14.883840+07:00",
        "create_by": "Admin Charge24",
        "check_publish_button": 1,
        "publish_start": "2024-11-19T14:08:13.990000+07:00",
        "publish_end": "2029-11-19T00:00:13.990000+07:00",
        "user_received": "alluser",
        "last_update_at": "2024-11-19T14:08:14.883840+07:00",
        "last_update_by": "Admin Charge24",
        "status": "publish",
        "check_nav_button": 1,
        "nav_to": "https://www.sanook.com/",
        "view": 2,
        "click": 0,
        "operator": "charge24"
      }
    ]
  }
};

@Component({
  selector: 'app-banner-detail',
  templateUrl: './banner-detail.component.html',
  styleUrls: ['./banner-detail.component.css']
})
export class BannerDetailComponent implements OnInit {
  publishType: string = 'schedule-range';

  navigationType: string = '';

  bannerDetail: any = {
    id: '',
    userReceived: '',
    navTo: '',
    image: '',
    publishDate: '',
    publishEnd: '',
    view: 0,
    click: 0,
    create_by: '',
    createDate: '',
    check_nav_button: '',
    last_update_by: '',
    lastUpdate: '',
    status: ''
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadBannerDetails(id);
    });
  }

  loadBannerDetails(id: number) {
    const selectedBanner = MOCK_DATA.meta.response_data.find(item => item.id === id);

    if (selectedBanner) {
      this.bannerDetail = {
        id: selectedBanner.id,
        userReceived: selectedBanner.user_received,
        navTo: selectedBanner.nav_to,
        image: selectedBanner.image,
        publishDate: new Date(selectedBanner.publish_start),
        publishEnd: new Date(selectedBanner.publish_end),
        view: selectedBanner.view,
        click: selectedBanner.click,
        check_nav_button: selectedBanner.check_nav_button.toString(),
        create_by: selectedBanner.create_by,
        createDate: new Date(selectedBanner.create_at),
        last_update_by: selectedBanner.last_update_by,
        lastUpdate: new Date(selectedBanner.last_update_at),
        status: selectedBanner.status
      };
      this.navigationType = this.mapNavigationType(selectedBanner.check_nav_button.toString());
    }
  }

  getDateRange(): string {
    const startDate = this.bannerDetail.publishDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      mounth: 'short',
      year: 'numeric'
    });
    const endDate = this.bannerDetail.publishEnd.toLocaleDateString('en-GB', {
      day: '2-digit',
      mounth: 'short',
      year: 'numeric'
    });
    return `${startDate} - ${endDate}`;
  }

  private mapNavigationType(checkNavButton: string): string {
    switch (checkNavButton) {
      case '1':
        return 'internal';
      case '2':
        return 'external';
      case '3':
        return 'inapp';
      default:
        return '';
    }
  }

}
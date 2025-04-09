import { Component, OnInit, ViewChild } from '@angular/core';
import { TestRequestRestService } from '../test-request-rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';


export interface itemsCol {
  no: number;
  image: string;
  user_received: string;
  navTo: string;
  view: number;
  click: number;
  publishDate: string;
  createDate: string;
  lastUpdate: string;
  status: string;
}

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
  selector: 'app-column-page-mockup',
  templateUrl: './column-page-mockup.component.html',
  styleUrls: ['./column-page-mockup.component.css']
})
export class ColumnPageMockupComponent implements OnInit {

  // ชื่อคอลัมน์ต้องตรงกับ matColumnDef ใน HTML
  displayedColumns: string[] = ['dragHandle', 'no', 'image', 'user_received', 'view', 'click', 'navTo', 'publishDate', 'createDate', 'lastUpdate', 'status', 'action'];
  // dataSource: itemsCol[] = [];
  dataSource = new MatTableDataSource<any>();

  searchText: string = '';  // เก็บค่าที่ผู้ใช้กรอกใน input
  filteredData: itemsCol[] = []; // เก็บข้อมูลที่ค้นหาได้

  filterUserReceived: string = 'all';
  filterStatus: string = 'all';

  sortDirection: string = 'desc';

  publishDateRange = {
    start: null as Date | null,
    end: null as Date | null
  };

  createDateRange = {
    start: null as Date | null,
    end: null as Date | null
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // ใช้ GetItems() จาก service ในการดึงข้อมูล API
  getData(): void {
    // ใช้ mock data แทนการเรียก API
    const response = MOCK_DATA;
    if (response && response.meta && response.meta.response_data) {
      this.dataSource.data = response.meta.response_data.map((item: any) => ({
        no: item.id,
        image: item.image,
        user_received: item.user_received,
        navTo: item.nav_to,
        view: item.view,
        click: item.click,
        publishDate: new Date(item.publish_start).toLocaleDateString(),
        publish_end: new Date(item.publish_end).toLocaleDateString(),
        create_by: item.create_by,
        last_update_by: item.last_update_by,
        createDate: new Date(item.create_at).toLocaleDateString(),
        lastUpdate: new Date(item.last_update_at).toLocaleDateString(),
        status: item.status
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.sortData();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    const rows = this.dataSource.data;
    moveItemInArray(rows, event.previousIndex, event.currentIndex);

    // Update row numbers based on new positions
    rows.forEach((row, index) => {
      row.no = index + 1;  // Assuming you want to start from 1
    });

    // Update the data source with new array
    this.dataSource.data = [...rows];
  }

  searchData(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  sortData(): void {
    const sortedData = this.dataSource.data.sort((a, b) => {
      const dateA = new Date(a.lastUpdate).getTime();
      const dateB = new Date(b.lastUpdate).getTime();

      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.dataSource.data = [...sortedData];
  }

  onSortChange(event: any): void {
    this.sortDirection = event.target.value;
    this.sortData();
  }

  search() {
    let filteredData = MOCK_DATA.meta.response_data;

    // Filter by user received
    if (this.filterUserReceived && this.filterUserReceived !== 'all') {
      filteredData = filteredData.filter(item =>
        item.user_received === this.filterUserReceived
      );
    }

    // Filter by status
    if (this.filterStatus && this.filterStatus !== 'all') {
      filteredData = filteredData.filter(item =>
        item.status === this.filterStatus
      );
    }

    // Filter by publish date range
    if (this.publishDateRange.start && this.publishDateRange.end) {
      filteredData = filteredData.filter(item => {
        const publishDate = new Date(item.publish_start);
        return publishDate >= this.publishDateRange.start! &&
          publishDate <= this.publishDateRange.end!;
      });
    }

    // Filter by create date range
    if (this.createDateRange.start && this.createDateRange.end) {
      filteredData = filteredData.filter(item => {
        const createDate = new Date(item.create_at);
        return createDate >= this.createDateRange.start! &&
          createDate <= this.createDateRange.end!;
      });
    }

    // Update table data
    this.dataSource.data = filteredData.map(item => ({
      no: item.id,
      image: item.image,
      user_received: item.user_received,
      navTo: item.nav_to,
      view: item.view,
      click: item.click,
      publishDate: new Date(item.publish_start).toLocaleDateString(),
      publish_end: new Date(item.publish_end).toLocaleDateString(),
      create_by: item.create_by,
      last_update_by: item.last_update_by,
      createDate: new Date(item.create_at).toLocaleDateString(),
      lastUpdate: new Date(item.last_update_at).toLocaleDateString(),
      status: item.status
    }));
  }

  reset() {
    // Reset all filters
    this.filterUserReceived = 'all';
    this.filterStatus = 'all';
    this.publishDateRange = {
      start: null,
      end: null
    };
    this.createDateRange = {
      start: null,
      end: null
    };

    // Reset table data to original
    this.getData();
  }

}

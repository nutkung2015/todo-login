import { Component, OnInit, ViewChild } from '@angular/core';
import { TestRequestRestService } from '../test-request-rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



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



@Component({
  selector: 'app-column-page-mockup',
  templateUrl: './column-page-mockup.component.html',
  styleUrls: ['./column-page-mockup.component.css']
})
export class ColumnPageMockupComponent implements OnInit {
  private apiUrl = 'http://192.168.1.134:8000/showCatalog';

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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // ใช้ GetItems() จาก service ในการดึงข้อมูล API
  getData(): void {
    const token = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    console.log("token", token)

    this.http.get(this.apiUrl, { headers }).subscribe({
      next: (response: any) => {
        if (response?.meta?.response_data) {
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
            createDate: item.created_at ? new Date(item.created_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : '-',
            lastUpdate: new Date(item.last_update_at).toLocaleDateString(),
            status: item.status
          }));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sortData();
        }
      },
      error: (error) => {
        console.error('Error fetching banners:', error);
        if (error.status === 401 || error.status === 403) {
          console.log('Token expired or unauthorized');
          this.authService.logout(); // ล้าง token และข้อมูล user
          this.router.navigate(['/login']);
        }
      }
    });
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


    const token = this.authService.getToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    // Prepare search parameters
    const searchParams = new URLSearchParams();

    if (this.filterUserReceived && this.filterUserReceived !== 'all') {
      searchParams.append('user_received', this.filterUserReceived);
    }

    if (this.filterStatus && this.filterStatus !== 'all') {
      searchParams.append('status', this.filterStatus);
    }

    if (this.publishDateRange.start && this.publishDateRange.end) {
      searchParams.append('publish_start', this.publishDateRange.start.toISOString());
      searchParams.append('publish_end', this.publishDateRange.end.toISOString());
    }

    if (this.createDateRange.start && this.createDateRange.end) {
      searchParams.append('create_start', this.createDateRange.start.toISOString());
      searchParams.append('create_end', this.createDateRange.end.toISOString());
    }

    // Call API with search parameters
    this.http.get(`${this.apiUrl}?${searchParams.toString()}`, { headers }).subscribe({
      next: (response: any) => {
        if (response?.meta?.response_data) {
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
        }
      },
      error: (error) => {
        console.error('Error searching banners:', error);
        if (error.status === 401 || error.status === 403) {
          console.log('Token expired or unauthorized');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
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

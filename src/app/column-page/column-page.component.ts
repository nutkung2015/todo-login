import { Component, OnInit, ViewChild } from '@angular/core';
import { TestRequestRestService } from '../test-request-rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface itemsCol {
  no: number;
  user_received: string;
  navTo: string;
  publishDate: string;
  createDate: string;
  lastUpdate: string;
  status: string;
}

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  styleUrls: ['./column-page.component.css']
})
export class ColumnPageComponent implements OnInit {

  // ชื่อคอลัมน์ต้องตรงกับ matColumnDef ใน HTML
  displayedColumns: string[] = ['no', 'user_received', 'navTo', 'publishDate', 'createDate', 'lastUpdate', 'status'];
  // dataSource: itemsCol[] = [];
  dataSource = new MatTableDataSource<itemsCol>();
  searchText: string = '';  // เก็บค่าที่ผู้ใช้กรอกใน input
  filteredData: itemsCol[] = []; // เก็บข้อมูลที่ค้นหาได้

  sortDirection: string = 'desc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: TestRequestRestService) { }

  ngOnInit(): void {
    // this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ใช้ GetItems() จาก service ในการดึงข้อมูล API
  // getData(): void {
  //   this.apiService.GetItems().subscribe(
  //     (response: any) => {
  //       // ตรวจสอบว่าข้อมูลที่ได้รับมี property meta.response_data
  //       if (response && response.meta && response.meta.response_data) {
  //         // แปลงข้อมูลให้ตรงกับ itemsCol
  //         this.dataSource.data = response.meta.response_data.map((item: any) => ({
  //           no: item.id,  // ใช้ id เป็นหมายเลข (หรือคุณอาจกำหนด index + 1 ตามที่ต้องการ)
  //           user_received: item.user_received,
  //           navTo: item.nav_to,  // เปลี่ยนชื่อ property ให้ตรงกับที่กำหนดใน displayedColumns
  //           publishDate: new Date(item.publish_start).toLocaleDateString(),
  //           publish_end: new Date(item.publish_end).toLocaleDateString(),
  //           create_by: item.create_by,
  //           last_update_by: item.last_update_by,
  //           createDate: new Date(item.create_at).toLocaleDateString(),
  //           lastUpdate: new Date(item.last_update_at).toLocaleDateString(),
  //           status: item.status
  //         }));
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;

  //         this.sortData();
  //       } else {
  //         console.error('API response format is incorrect:', response);
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

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
  // searchData(): void {
  //   if (this.searchText.trim() === '') {
  //     this.filteredData = [...this.dataSource];
  //   } else {
  //     this.filteredData = this.dataSource.filter(item =>
  //       item.navTo.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   }
  // }
}

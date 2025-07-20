import { Component, OnInit } from '@angular/core';
import { FirebaseTestService } from '../services/firebase-test.service';
import { environment } from 'src/environments/environment';


interface CollectionData {
  collectionName: string;
  data: any[];
}

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {
  collectionsData: CollectionData[] = [];
  isLoading: boolean = true;

  constructor(private firebaseTest: FirebaseTestService) { }

  ngOnInit() {
    // this.loadCollectionsData();
    this.firebaseTest.listAllCollections();
  }

  loadCollectionsData() {
    console.log('Loading data from project:', environment.firebase.projectId);
    this.firebaseTest.getAllCollections().subscribe({
      next: (collections) => {
        this.collectionsData = collections;
        console.log('Collections loaded:', this.collectionsData);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading collections:', error);
        this.isLoading = false;
      }
    });
  }
}
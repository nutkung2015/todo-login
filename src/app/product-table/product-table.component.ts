import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FirebaseTestService } from '../services/firebase-test.service';
import { FormControl } from '@angular/forms';

export interface EvBrand {
  Name: string;
  Id_Brand: number;
}

export interface EvModel {
  NameModel: string;
  Id_Brand: number;
  Id_model: number;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  name_brands: EvBrand[] = [];
  models: EvModel[] = [];
  filteredModels: EvModel[] = [];
  searchControl = new FormControl('');
  // selectedBrand = new FormControl('');
  selectedBrand = new FormControl<number | null>(null);

  constructor(
    private firestore: AngularFirestore,
    private firebaseTest: FirebaseTestService
  ) { }

  ngOnInit(): void {
    // this.getEvBrands();
    // this.getEvModels();
    // this.firebaseTest.listAllCollections();

    //get for ui
    this.loadBrands();
    this.loadModels();
    this.setupFilters();
  }

  brandChange() {
    const selectedBrandId = this.selectedBrand.value;
    if (selectedBrandId !== null) {
      this.filteredModels = this.models.filter(model => model.Id_Brand === selectedBrandId);
    } else {
      this.filteredModels = this.models; // Show all models if no brand is selected
    }
  }

  loadBrands() {
    this.firestore.collection<EvBrand>('ev_brands').valueChanges().subscribe(brands => {
      this.name_brands = brands;
    });
  }

  loadModels() {
    this.firestore.collection<EvModel>('ev_models').valueChanges().subscribe(models => {
      this.models = models;
      this.filteredModels = models;
    });
  }

  getBrandNameById(brandId: number): string {
    const brand = this.name_brands.find(b => b.Id_Brand === brandId);
    console.log(brand)
    return brand ? brand.Name : 'Unknown Brand';

  }


  setupFilters() {
    this.searchControl.valueChanges.subscribe(searchTerm => {
      this.filterModels(searchTerm, this.selectedBrand.value);
    });

    this.selectedBrand.valueChanges.subscribe(brandId => {
      // this.filterModels(this.searchControl.value, brandId);
      this.brandChange();
    });
  }

  filterModels(searchTerm: string | null, brandId: number | null) {
    this.filteredModels = this.models.filter(model => {
      const matchesSearch = !searchTerm ||
        model.NameModel.toLowerCase().includes(searchTerm.toLowerCase());  // Corrected property name
      const matchesBrand = !brandId || model.Id_Brand === brandId;
      return matchesSearch && matchesBrand;
    });
  }

  getEvBrands() {
    console.log('Listing all collections in Firebase project:', environment.firebase.projectId);
    this.firestore.collection('ev_brands').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        console.log('Document ID:', doc.id);
        console.log('Data:', doc.data());
      });
    });
  }

  getEvModels() {
    this.firestore.collection('ev_models').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        console.log('Document ID:', doc.id);
        console.log('Data:', doc.data());
      });
    });
  }
}
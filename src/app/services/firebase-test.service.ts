import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, forkJoin, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { environment } from 'src/environments/environment';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

export interface CollectionData {
    collectionName: string;
    data: any[];
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseTestService {
    constructor(private firestore: AngularFirestore) {

    }

    getAllCollections(): Observable<CollectionData[]> {
        console.log('Fetching all collections from:', environment.firebase.projectId);
        const db = this.firestore;

        // Predefined collections based on your Firebase structure
        const collections = [
            'users',
            'products',
            'orders',
            // Add other collection names as needed
        ];

        const collectionData = collections.map(collectionName => {
            return db.collection(collectionName).valueChanges()
                .pipe(
                    map(data => ({
                        collectionName: collectionName,
                        data: data as any[]
                    }))
                );
        });

        return forkJoin(collectionData || []);
    }



    listAllCollections() {
        console.log('Listing all collections in Firebase project:', environment.firebase.projectId);
        this.firestore.firestore.collection('ev_brands').get()
            .then(snapshot => {
                console.log('Available collections:');
                snapshot.docs.forEach(doc => {
                    console.log('Collection:', doc.ref.path);
                    console.log('Data:', doc.data());
                });
            })
            .catch(error => {
                console.error('Error listing collections:', error);
            });
    }

    // getAllCollections_2(): Observable<CollectionData[]> {
    //     console.log('Fetching ALL collections from Firebase...');
    //     const db = this.firestore;

    //     // Get root collections
    //     return from(db.collection('/').get().toPromise()).pipe(
    //         mergeMap(async () => {
    //             const collections = await db.firestore.listCollections();
    //             return collections;
    //         }),
    //         mergeMap((collections: CollectionReference<DocumentData>[]) => {
    //             if (collections.length === 0) {
    //                 console.log('No collections found');
    //                 return forkJoin([]);
    //             }

    //             const collectionData = collections.map((collection: CollectionReference<DocumentData>) => {
    //                 console.log('Found collection:', collection.id);
    //                 return db.collection(collection.id).valueChanges()
    //                     .pipe(
    //                         map(data => ({
    //                             collectionName: collection.id,
    //                             data: data as any[]
    //                         }))
    //                     );
    //             });

    //             return forkJoin(collectionData);
    //         })
    //     );
    // }

    testConnection() {
        this.getAllCollections().subscribe({
            next: (data) => {
                console.log('All collections data:', data);
            },
            error: (error) => {
                console.error('Error fetching collections:', error);
            }
        });
    }

    // async getAllCollectionsAndDocuments() {
    //     try {
    //         const collections = await this.firestore.firestore.listCollections();
    //         for (const collection of collections) {
    //             console.log(`Collection ID: ${collection.id}`);
    //             const snapshot = await collection.get();
    //             snapshot.forEach((doc: any) => {
    //                 console.log(`Document ID: ${doc.id}`, doc.data());
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error fetching collections and documents:', error);
    //     }
    // }

}
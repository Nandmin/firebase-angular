import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// az app.component.ts-ből áthozzuk a service-t (read), 
// ezen keresztül érje el a html az adatot

@Injectable({
  providedIn: 'root'
})
export class UserService {

  all: Observable<any>
  itemsCollection: AngularFirestoreCollection<any>;

  
  constructor(
    private fireStore: AngularFirestore
  ) {
    // ngOninit-ből ide szervezem a read-t
    // app.component-ben a constructort is átírom
    //eredetileg: this.all = this.fireStore.collection('users').valueChanges({
    this.itemsCollection = this.fireStore.collection('myUsers');
    this.all = this.itemsCollection.valueChanges({
      idField: 'docID'
    });
   }

   create(doc: any): Promise<any>{
     // spread operátor a ...doc : leklónozza a meglévő objektumot és lesz belőle plain object
    return this.itemsCollection.add( {...doc} );
   }

   update(doc: any): Promise<any>{
    // mivel az id-t nem akarjuk módosítani, ezért azt ki kell venni/törölni
    const id = doc.docID;
    delete doc.docID
    
    return this.itemsCollection.doc(id).update( {...doc} );
  }

  delete(doc: any): Promise<any>{
    return this.itemsCollection.doc(doc.docID).delete();
  }
}

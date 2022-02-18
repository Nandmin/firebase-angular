import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<div>{{ (item | async)?.name}}</div>'
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'firebase-angular';
  items: Observable<any> = this.userService.all;

  constructor(
    // a servic-be szervezés miatt ez már nem kell
    // private fireStore: AngularFirestore
    // helyette
    private userService: UserService
  ){ }

  ngOnInit(): void {
    // docID: az egyes documentumok egyedi azonosítója, ami alapján lehet rájuk hivatkozni
    // további CRUD új service-ben
      // this.items = this.fireStore.collection('users').valueChanges({
      //   idField: 'docID'
      // });
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // ez elérhetővé teszi a css-t
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'firebase-angular';
  items: Observable<any> = this.userService.all;
  newUser: User = new User();

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
      
      // eseménykezelő metódosuk, amik elvégzik a feladatot és meghívják a
      // userservice-ből az adott metódust
      // kell neki user osztályt létrehozni
    }
    
    onCreate(user: User): void {
      this.userService.create(user).then(
        resp => alert('New user added'),
        err => alert(err.error)
        );
    }

    onUpdate(user: User): void {
      this.userService.update(user).then(
        resp => alert('User updated'),
        err => alert(err.error)
        );
    }

    onDelete(user: User): void {
      if(!confirm('Are you sure?')){
        return
      }

      this.userService.delete(user).then(
        resp => alert('User deleted'),
        err => alert(err.error)
        );
    }
}

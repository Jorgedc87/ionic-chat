import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje';
import {CollectionReference, DocumentData ,addDoc ,collection ,deleteDoc ,doc ,updateDoc, query, orderBy, getDocs, onSnapshot } from '@firebase/firestore';
import { Firestore, collectionData, docData, getFirestore } from '@angular/fire/firestore';
import { firebaseApp$ } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  // const docRef = doc(db, "chats");
  private chatCollections: CollectionReference<DocumentData>;
  public chats: Mensaje[];

  constructor(private firestore: Firestore,) {
    this.chatCollections = collection(this.firestore, 'chats');
    console.log(firestore)
  }

  
  //query

  
  traeMensajes(){
    // this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('timestamp', 'asc'));
    // return this.itemsCollection.valueChanges()
    return collectionData(this.chatCollections, {
    }) as Observable<Mensaje[]>;
  }

  enviaMensaje(mensaje){
    // return this.itemsCollection.add(mensaje)
    return addDoc(this.chatCollections, mensaje);
  }
}

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { map, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export interface ICategory {
  id: number;
  name: string;
  image: string;
  link: string,

}

// Product Interface
export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string[];
  category: number;
  description: string;
  stock: number[][];
  color: string[];
  size: string[];
}

export interface bookings {
  date: string;
  start: string;
  duration: number;
  machine: string;
  name: string;
}
export interface disease {
  name: string;
  year: string;
}
export interface user {
  first_name: string;
  last_name: string;
  ic: string;
}
export interface v {
  vplate: string;
  vmodel: string;
  vtype: string;
}
export interface ins {
  filepath: string;
}
export interface edu {
  name: string;
  date: string;
  filepath: string;
}
export interface ass {
  name: string;
  year: string;
}
export interface family {
  name: string;
  rel: string;
  ic: string;
  filepath: string;
}

export interface Mydata {
  filepath: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (!user) {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
      }
    });
  }

  // createOrUpdateTicket(id = null, info): Promise<any> {
  //   if (id) {
  //     return this.db.doc(`tickets/${id}`).update(info);
  //   } else {
  //     info['creator'] = this.auth.currentUser.value.id;
  //     info['created_at'] = firebase.firestore.FieldValue.serverTimestamp();
  //     return this.db.collection('tickets').add(info);
  //   }
  // }

  getUserTickets() {
    let id = this.auth.currentUser.value.id;
    return this.db
      .collection('tickets', (ref) => ref.where('creator', '==', id))
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }
  getuserinfo() {
    return this.auth.currentUser.value;
  }

  getAdminTickets() {
    return this.db
      .collection('machinelist')
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }
  getcollectionnoid(collection) {
    let dataCollection = this.db.collection(collection);
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  getcollectionincollectionnoid(collection1, doc1, collection2) {
    let dataCollection = this.db
      .doc(collection1 + '/' + doc1)
      .collection(collection2);
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  getcollection(type2, collection, type) {
    let dataCollection = this.db.collection(collection, (ref) =>
      ref.where(type, '==', type2)
    );
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  getcollectionbyid(id, collection) {
    let datalist = this.db
      .doc(collection + '/' + id)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const data = actions.payload.data() as any;
          const id = actions.payload.id;

          console.log(id);
          return { id, ...data };
        })
      );
    return datalist;
  }

  getcollectionbyinfo(
    collection,
    c1a: string,
    c1b: string,
    c2a: string,
    c2b,
    s1a: string
  ) {
    let dataCollection = this.db.collection(collection, (ref) =>
      ref
        .where(c1a, '==', c1b)
        .where(c2a, '==', c2b)
        .orderBy(s1a, 'desc')
        .limit(1)
    );
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  getcollectionbyinfonolimit(
    collection,
    c1a: string,
    c1b: string,
    s1a: string
  ) {
    let dataCollection = this.db.collection(collection, (ref) =>
      ref.where(c1a, '==', c1b)
    );
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  addcollection(type, data) {
    return this.db.collection(String(type)).add(data);
  }
  addcollectionincollection(collection1, doc1, collection2, data) {
    return this.db
      .collection(collection1)
      .doc(doc1)
      .collection(collection2)
      .add(data);
  }
  updateprofile(usid, data) {
    return this.db.doc(`users/${usid}`).update(data);
  }
  updatebyid(id, data, collection) {
    console.log(collection);
    return this.db.doc(collection + '/' + id).update(data);
  }
  setbyid(id, data, collection) {
    console.log(collection);
    return this.db.doc(collection + '/' + id).set(data);
  }
  adddata(collection1, doc1, collection2, doc2, data) {
    // console.log(type)
    return this.db
      .doc(collection1 + '/' + doc1)
      .collection(collection2)
      .doc(doc2)
      .set(data);
  }
  adddevice(data, deviceid) {
    return this.db.doc('Devices/' + deviceid).set(data);
  }
  deletebyid(id, collection) {
    return this.db.doc(collection + '/' + id).delete();
  }
  deletebyidcinc(collection1, doc1, collection2, doc2) {
    return this.db
      .doc(collection1 + '/' + doc1)
      .collection(collection2)
      .doc(doc2)
      .delete();
  }
  getTicket(id) {
    return this.db.doc(`tickets/${id}`).valueChanges().pipe(take(1));
  }

  getUser(id) {
    return this.db.doc(`users/${id}`).valueChanges().pipe(take(1));
  }

  deleteTicket(id) {
    return this.db.doc(`machinelist/${id}`).delete();
  }

  getusers() {
    let userCollection = this.db.collection('users', (ref) =>
      ref.where('role', '==', 'USER')
    );
    let userlist = userCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as user;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return userlist;
  }
  createbooking(data) {
    return this.db.collection('bookings').add(data);
  }
  getbookingsdate(datestring) {
    let bookingCollection = this.db.collection('bookings', (ref) =>
      ref.where('date', '==', datestring)
    );
    let bookinglist = bookingCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as bookings;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return bookinglist;
  }
  updateImagetoDB(image: Mydata, x, type) {
    // Create an ID for document
    let imageCollection = this.db
      .collection('users')
      .doc(this.getuserinfo().id)
      .collection(type);

    // Set document id with value in database
    imageCollection
      .doc(x)
      .update(image)
      .then((resp) => {
        console.log('data is' + resp);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }
  addImagetoDB(image: Mydata, type) {
    // Create an ID for document
    let imageCollection = this.db
      .collection('users')
      .doc(this.getuserinfo().id)
      .collection(type);

    // Set document id with value in database
    imageCollection
      .add(image)
      .then((resp) => {
        console.log('data is' + resp);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Womens',
      image: '../../assets/categories/category-1.png',
      link: '/productlist/women',
    };
    let cat2: ICategory = {
      id: 2,
      name: 'Mens',
      image: '../../assets/categories/category-2.png',
      link: '/productlist/men',

    };
    // let cat3: ICategory = {
    //   id: 3,
    //   name: 'Kids',
    //   image: '../../assets/categories/category-3.png',
    // };

    categories.push(cat1, cat2);

    return categories;
  }
  getproductlist(
    collection,
  ) {
    let dataCollection = this.db.collection(collection);
    let datalist = dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          console.log(id);
          return { id, ...data };
        })
      )
    );
    return datalist;
  }
  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: ['../../assets/products/prod-1.png','../../assets/products/prod-4.png','../../assets/products/prod-5.png'],
      category: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus quis nunc luctus ultrices. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
      stock: [[1,2,3,4],[9,10,11,12],[13,14,15,16]],
      color: ['red', 'green', 'yellow'],
      size: ['S', 'M', 'L', 'XL'],
    };
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: ['../../assets/products/prod-2.png','../../assets/products/prod-4.png','../../assets/products/prod-5.png'],
      category: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus quis nunc luctus ultrices. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
      stock: [[10,20,30,40],[90,100,110,120],[130,140,150,160]],
      color: ['red', 'green', 'yellow'],
      size: ['S', 'M', 'L', 'XL'],
    };
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: ['../../assets/products/prod-3.png','../../assets/products/prod-4.png','../../assets/products/prod-5.png'],
      category: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus quis nunc luctus ultrices. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.',
      stock: [[1,2,3,4],[9,10,11,12],[13,14,15,16]],
      color: ['red', 'green', 'yellow'],
      size: ['S', 'M', 'L', 'XL'],
    };

    products.push(prod1, prod2, prod3);

    return products;
  }

  // getBestSellProducts() {
  //   let products = [];

  //   let prod1: IProduct = {
  //     id: 1,
  //     name: 'Womens T-Shirt',
  //     price: 55,
  //     image: ['../assets/products/prod-4.png'],
  //     // image: '../../assets/products/prod-4.png'
  //   };
  //   let prod2: IProduct = {
  //     id: 2,
  //     name: 'Mens T-Shirt',
  //     price: 34,
  //     image: '../assets/products/prod-5.png',
  //   };
  //   let prod3: IProduct = {
  //     id: 1,
  //     name: 'Womens T-Shirt',
  //     price: 40,
  //     image: '../assets/products/prod-6.png',
  //   };

  //   products.push(prod1, prod2, prod3);

  //   return products;
  // }
}

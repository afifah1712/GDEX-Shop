import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { TicketService } from 'src/app/services/ticket.service';
import { NavController } from '@ionic/angular';
export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-manageproducts-details',
  templateUrl: './manageproducts-details.page.html',
  styleUrls: ['./manageproducts-details.page.scss'],
})
export class ManageproductsDetailsPage implements OnInit {
  productlist;
  filepath;
  stocklevel = [];
  productsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticket: TicketService,
    private afStorage: AngularFireStorage,
    private navctrl:NavController
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    // Define uploaded files collection
    // this.filesCollection = afs.collection<imgFile>('imagesCollection');
    // this.files = this.filesCollection.valueChanges();

    this.productsForm = this.fb.group({
      color: this.fb.array([]),
      size: this.fb.array([]),
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: [[], [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get color(): FormArray {
    return this.productsForm.get('color') as FormArray;
  }
  get size(): FormArray {
    return this.productsForm.get('size') as FormArray;
  }
  newcolor(): FormGroup {
    return this.fb.group({
      color: '',
    });
  }
  newsize(): FormGroup {
    return this.fb.group({
      size: '',
    });
  }

  addcolor() {
    this.color.push(this.newcolor());
    this.stocklevel.push([]);
  }
  addsize() {
    this.size.push(this.newsize());
  }
  removeproduct(i: number) {
    this.color.removeAt(i);
  }
  
  onSubmit() {
    console.log(this.productsForm.value);
    let color = [];
    let size = [];
    this.productsForm.value.color.forEach((element) => {
      color.push(element.color);
      // color.push(element.color);
      // stock.push(element.stock);
    });
    this.productsForm.value.size.forEach((element) => {
      size.push(element.size);
      // color.push(element.color);
      // stock.push(element.stock);
    });

    let result = {};
   
    console.log(this.stocklevel)
    for (let i = 0; i < color.length; i++) {
      result[color[i]] = this.stocklevel[i];
    }


  // console.log(result);
    let newobj = {
      color: color,
      size: size,
      stock: result,
      name: this.productsForm.value.name,
      price: this.productsForm.value.price,
      image: this.productsForm.value.image,
      category: this.productsForm.value.category,
      description: this.productsForm.value.description,
    };

    console.log(newobj);
    this.ticket.addcollection('products', newobj).then((res) => {
this.navctrl.navigateRoot('/manageproducts')
  }
    );
  }
  ngOnInit() {
    // this.productform = this.fb.group({
    //   name: ['', [Validators.required]],
    //   price: ['', [Validators.required]],
    //   image: [[], [Validators.required]],
    //   category: ['', [Validators.required]],
    //   description: ['', [Validators.required]],
    //   stock: [[], [Validators.required]],
    //   color: [[], [Validators.required]],
    //   size: [this.fb.array([]), [Validators.required]]
    // });
  }
  fileUploadTask: AngularFireUploadTask;
  // Upload progress
  percentageVal: Observable<number>;
  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;
  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  // Uploaded image collection
  files: Observable<imgFile[]>;
  // Image specifications
  imgName: string;
  imgSize: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;
  // private filesCollection: AngularFirestoreCollection<imgFile>;

  uploadImage(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(
          (resp) => {
            this.productsForm.patchValue({
              image: [resp],
            });
            console.log(resp);
            // this.storeFilesFirebase({
            //   name: file.name,
            //   filepath: resp,
            //   size: this.imgSize,
            // });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }
  // storeFilesFirebase(image: imgFile) {
  //   const fileId = this.afs.createId();
  //   this.filesCollection
  //     .doc(fileId)
  //     .set(image)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

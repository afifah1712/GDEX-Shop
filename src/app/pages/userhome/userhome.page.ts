import { TicketService } from './../../services/ticket.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.page.html',
  styleUrls: ['./userhome.page.scss'],
})
export class UserhomePage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  infos;
  userid;
  productlist;
  searchterm=''
  constructor(
    public modalController: ModalController,
    private navCtrl: NavController,
    public alertController: AlertController,
    private auth: AuthService,
    private ticket: TicketService
  ) {}

  ngOnInit() {
    this.userid = this.ticket.getuserinfo().id;
    this.ticket.getproductlist('products').subscribe((res) => {
      this.productlist = res;
      console.log(this.productlist);
    });

    this.categories = this.ticket.getCategories();
    this.featuredProducts = this.ticket.getFeaturedProducts();
    this.bestSellProducts = this.ticket.getFeaturedProducts();
  }

  signOut() {
    this.auth.signOut();
  }
  // cartmodal(){
  //   this.modalController.create({
  //     component: CartPage,
  //     breakpoints: [0, 1],
  //     initialBreakpoint: 1
  //   }).then((modalElement)=>{
  //     modalElement.present();
  //   })
  // }
  identify(index, item){
    return item.name; 
 }
}

import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  totalprice;
  cartlist;
  userinfo;
  paymenttype = 'wallet';
  constructor(
    private toast: ToastController,
    private navctrl: NavController,
    private auth: AuthService,
    private ticket: TicketService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((res) => {
      this.userinfo = res;
    });
  }
  pay() {
    if(this.paymenttype=='wallet'){
      if (this.userinfo.wallet >= this.totalprice) {
        let newwallet = this.userinfo.wallet - this.totalprice;
        this.ticket
          .updatebyid(this.userinfo.id, { wallet: newwallet }, 'users')
          .then(() => {
            this.ticket
              .addcollection('orders', { products: this.cartlist ,userinfo:this.userinfo,time:new Date(),totalprice:this.totalprice})
              .then(() => {

                this.ticket.deletebyid(this.userinfo.id, 'cart').then(() => {
                  this.toastalert('order placed');
                  if(this.userinfo.role=='EMPLOYEE'){
                    this.ticket.updatebyid(this.userinfo.id,{points:this.userinfo.points+this.totalprice*10},'users').then(()=>{
                      this.modal.dismiss();
                      this.navctrl.navigateRoot('/mypurchase');
                      return
                    }
                    )
                  }
                  this.modal.dismiss();
                  this.navctrl.navigateRoot('/mypurchase');
                });
              });
          });
          this.ticket.updatebyid(this.userinfo.id,{address:this.userinfo.address,postcode:this.userinfo.postcode,city:this.userinfo.city,state:this.userinfo.state,},'users')
      } else {
        this.toastalert('insufficient balance');
      }
    }
    else{
      this.totalprice=this.totalprice*100;
      if (this.userinfo.points >= this.totalprice) {
        let newpoints = this.userinfo.points - this.totalprice;
        this.ticket
          .updatebyid(this.userinfo.id, { points: newpoints }, 'users')
          .then(() => {
            this.ticket
              .addcollection('orders', { products: this.cartlist ,userinfo:this.userinfo,time:new Date(),totalprice:this.totalprice})
              .then(() => {
                this.ticket.deletebyid(this.userinfo.id, 'cart').then(() => {
                  this.toastalert('order placed');
                  this.modal.dismiss();
                  this.navctrl.navigateRoot('/mypurchase');
                });
              });
          });
          this.ticket.updatebyid(this.userinfo.id,{address:this.userinfo.address,postcode:this.userinfo.postcode,city:this.userinfo.city,state:this.userinfo.state,},'users')

      } else {
        this.toastalert('insufficient balance');
      }
    }
  }

  toastalert(message) {
    this.toast
      .create({
        message: message,
        duration: 2000,
      })
      .then((res) => {
        res.present();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { CheckoutPageModule } from '../checkout/checkout.module';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  userinfo;
  cartlist = [];
  constructor(
    private ticket: TicketService,
    private auth: AuthService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((res) => {
      this.userinfo = res;
      this.ticket
        .getcollectionbyid(this.userinfo.id, 'cart')
        .pipe(
          take(1),
          tap((res) => {
            this.cartlist = [];
            let cartobj = res;
            Object.keys(cartobj).forEach((key) => {
              if (key == 'id') return;

              console.log(key);

              this.ticket
                .getcollectionbyid(key, 'products')
                .pipe(
                  take(1),
                  tap((res2) => {
                    // console.log(res2);
                    let obj = {};
                    obj = {
                      id: key,
                      name: res2.name,
                      data: cartobj[key],
                    };

                    this.cartlist.push(obj);
                    console.log(this.cartlist);
                  })
                )
                .subscribe();
            });
          })
        )
        .subscribe((res) => {});
    });
  }
  closemodal() {
    this.modal.dismiss();
  }
  totalprice() {
    let total = 0;
    this.cartlist.forEach((element) => {
      element.data.forEach((element2) => {
        total += element2.price * element2.quantity;
      });
    });
    return total;
  }
  checkoutmodal() {
    this.modal
      .create({
        component: CheckoutPage,
        breakpoints: [0, 1],
        initialBreakpoint: 1,
        componentProps: {
          totalprice: this.totalprice(),
          cartlist: this.cartlist,
        },
      })
      .then((modal) => {
        modal.present();
      });
  }
}

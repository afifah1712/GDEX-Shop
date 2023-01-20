import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  selectedsizeindex: number;
  selectedcolorindex: number;
  itemid;
  iteminfo;
  quantity = 0;
  cartobj = {};
  userinfo;
  itemarr=[];

  constructor(
    private animatioCntrl: AnimationController,
    private ticket: TicketService,
    private navctrl:NavController,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.auth.user.subscribe((res) => {
      console.log(res);
      this.userinfo = res;
      this.ticket
        .getcollectionbyid(res.id, 'cart')
        .pipe(
          map((res2) => {
            console.log(res2);
            this.cartobj = res2;
          })
        )
        .subscribe((res2) => {
       
        });
    });

    this.itemid = this.route.params.subscribe((params) => {
      this.itemid = params['productid'];
      this.ticket
        .getcollectionbyid(this.itemid, 'products')
        .subscribe((res) => {
          this.iteminfo = res;
          console.log(this.iteminfo);
        });

      console.log(this.itemid);
      
    });

    this.activeVariation = 'size';
  }

  buynow(){
    this.addtocart();
    this.navctrl.navigateForward('/user/cart');
    
  }
  addtocart() {

    let newobj = {
      size: this.selectedSize,
      color: this.selectedColor,
      quantity: this.quantity,
      price:this.iteminfo.price,
    };
    console.log(this.cartobj)

    let itemexist = false;
    if(this.cartobj[this.iteminfo.id]){
      this.itemarr =this.cartobj[this.iteminfo.id] 

    }

    if (this.itemarr.length!=0) {
      this.itemarr.map((element) => {
        if (
          element.size == this.selectedSize &&
          element.color == this.selectedColor
        ) {
          itemexist = true;
          element.quantity += this.quantity;
        }
     

      });
      if(!itemexist){
        this.itemarr.push(newobj);
      }
    }
    else{
      this.itemarr.push(newobj);

    }
    this.cartobj[this.iteminfo.id] = this.itemarr;
    this.ticket.setbyid(this.userinfo.id, this.cartobj, 'cart');
    console.log(this.cartobj);

    console.log(
      'add to cart',
      this.selectedSize,
      this.selectedColor,
      this.quantity
    );
  }

  increaseCount() {
    this.quantity += 1;
    if (this.quantity > 9999) {
      this.quantity = 9999;
    }
  }

  decreaseCount() {
    if (this.quantity <= 0) {
      this.quantity = 0;
      return;
    }

    this.quantity -= 1;
  }
  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
        .fromTo('opacity', '1', '0.2')
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
    } else {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
    }
  }

  changeSize(size: number, index: number) {
    this.selectedSize = size;
    this.selectedsizeindex = index;
  }

  changeColor(color: number, index: number) {
    this.selectedColor = color;
    this.selectedcolorindex = index;
  }

}

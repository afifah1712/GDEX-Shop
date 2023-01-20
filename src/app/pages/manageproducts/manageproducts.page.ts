import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.page.html',
  styleUrls: ['./manageproducts.page.scss'],
})
export class ManageproductsPage implements OnInit {
  productlist;
  allproductlist;
  $filter = 'all';
  constructor(private ticket: TicketService) {}

  ngOnInit() {
    this.ticket
    .getproductlist('products')
    .pipe(
      take(1),
      tap((res) => {
        this.productlist = res;
        this.allproductlist = res;
      })
    )
    .subscribe();
  }
  ionViewWillEnter() {
   
  }
  filter() {
    if (this.$filter == 'all') {
      this.productlist = this.allproductlist;
    } else {
      console.log(this.$filter);
      this.productlist = this.allproductlist.filter(
        (x) => x.category == this.$filter
      );
    }
  }
}

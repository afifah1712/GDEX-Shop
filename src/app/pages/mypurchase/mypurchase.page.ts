import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-mypurchase',
  templateUrl: './mypurchase.page.html',
  styleUrls: ['./mypurchase.page.scss'],
})
export class MypurchasePage implements OnInit {
userinfo
orderlist
  constructor(private ticket:TicketService,private auth:AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(res => {
      this.userinfo = res;
      this.ticket.getcollectionbyinfonolimit('orders','userinfo.id',res.id,'time').subscribe(orderlist => {
        console.log(orderlist);
        this.orderlist=orderlist;
      }
      )
    })

  }
check(product){
  let check = false;
  console.log(product)
  // product.products.forEach(element => {
  //   if(element.id == this.userinfo.id){
  //     check = true;
  //   }
  // });
  return check;
}
}

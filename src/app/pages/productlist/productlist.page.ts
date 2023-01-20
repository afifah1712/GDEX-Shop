import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
productlist;
mainproductlist
category
searchterm=''

  constructor(
    private ticket: TicketService,
private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((res)=>{
      console.log(res.category)
      this.category=res.category
      this.ticket.getproductlist('products').subscribe((res2) => {
        this.productlist = res2;
        this.mainproductlist=res2
       this.filterdata(res.category);

        console.log(this.productlist);
      });
    })

  }
  filterdata(category){
    if(category=='all'){
      this.productlist=this.mainproductlist
    }else{
      this.productlist=this.mainproductlist.filter((res)=>{
        return res.category==category
      })
    }
  }
  identify(index, item){
    return item.name; 
 }
}

import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.page.html',
  styleUrls: ['./allorders.page.scss'],
})
export class AllordersPage implements OnInit {
orderlist
  constructor(private ticket:TicketService) { }

  ngOnInit() {
    this.ticket.getcollectionnoid('orders').subscribe(res => {
      this.orderlist = res.sort((a,b)=>b.time.seconds-a.time.seconds);
    }
    )
  }

}

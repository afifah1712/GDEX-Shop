import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-rolemanager',
  templateUrl: './rolemanager.page.html',
  styleUrls: ['./rolemanager.page.scss'],
})
export class RolemanagerPage implements OnInit {
  userlist
  constructor(private ticket:TicketService) { }

  ngOnInit() {
this.ticket.getcollectionnoid('users').subscribe(res => {
  this.userlist = res;
})
  }
updaterole(user){
this.ticket.updatebyid(user.id,{role:user.role},'users')
}
}

import { TicketService } from './../../services/ticket.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { AlertController, ModalController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {

  infos
  userid
  
    constructor(public modalController: ModalController,private navCtrl:NavController,public alertController: AlertController,private auth: AuthService, private ticket: TicketService) { }
  
    ngOnInit() {
      this.userid = this.ticket.getuserinfo().id
      this.infos = [
  
        // {id: 1, name:'Top-up',icon:'body',link:'/walletmanager'},
        {id: 1, name:'Manage Products',icon:'list',link:'/manageproducts'},
        // {id: 2, name:'Manage Students',icon:'people',link:'students/'+this.userid},
        {id: 2, name:'Manage Orders',icon:'list-circle',link:'/allorders'},
        {id: 3, name:'Role Manager',icon:'finger-print',link:'/rolemanager'},
    
    ];
    }
  
   
    signOut() {
      this.auth.signOut();
    }
    
   
}

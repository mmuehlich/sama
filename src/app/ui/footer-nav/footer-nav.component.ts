import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent implements OnInit {

  showLogin = false;
  
  constructor(public auth: AuthService, ) { }

  ngOnInit() {
  }
}

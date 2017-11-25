import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent implements OnInit {

  showLogin = false;
  
  constructor() { }

  ngOnInit() {
  }

}

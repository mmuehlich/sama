import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'save-the-date',
  templateUrl: './save-the-date.html',
  styleUrls: ['./save-the-date.scss']
})

export class SaveTheDate {

  constructor(public auth: AuthService, private router: Router) { 
    if (auth.currentUser) {
      this.router.navigate(['wedding']) 
    }

    /*
    setTimeout(function(){
      $('.save-the-date-label').animate({
        transform: scale(0.5, 0.5),
        margin-left: "30%",
        top: "10%"
      }, 2000, function() {
        // Animation complete.
      });
    },100);
    */
  }
}

import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../service/redirect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private redirect: RedirectService) { }

  ngOnInit(): void {
  }

  public redirectToHome(){
    this.redirect.redirectToHome();
  }

}

import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: TokenService) { }

  ngOnInit(): void {
    console.log('esta loggeado', this.service.isLoggedIn())
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService,
    private router: Router
     ){}
  
  ngOnInit(): void {
    this.accountService.loadUser();
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showFriendBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService){}


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showFriendBoard = this.roles.includes('ROLE_FRIEND');

      this.username = user.username;
    }

  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

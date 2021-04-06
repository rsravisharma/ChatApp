import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username?: string;
  room:String = '';
  user:String = '';
  messageText: String ='';
  messageArray: Array<{user:String, message:String}> = [];
  usersArray: Array<{name:String}> = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private chatService: ChatService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();

      this.user = user.username;
    }

  	this.chatService.getMessages()
  	.subscribe((message:any)=>this.messageArray.push(message));


  	// this.chatService.getUsers()
  	// .subscribe((users:any)=>this.usersArray.push(users));
  }


  sendMessage() {
    if(this.user== '') this.user = 'guest';
  	this.chatService.sendMessage({user:this.user, message:this.messageText});
  	this.messageText = '';
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) { 
  }

  public sendMessage(message : any) {
    // console.log(message);
    this.socket.emit('message', message);
  }

  // newMessageReceived(){
  //   let observable = new Observable<{user:String, message:String}>(observer=>{
  //     this.socket.on('new message', (data: any)=>{
  //       observer.next(data);
  //     });
  //     return ()=> {this.socket.disconnect();}
  //   });
  // }

  public getMessages = () => {
    return Observable.create((observer: any) => {
            this.socket.on('new message', (message: any) => {
                observer.next(message);
            });
    });
  }

  // public getUsers = () => {
  //   return Observable.create((observer: any) => {
  //           this.socket.on('users', (users: any) => {
  //               observer.next(users);
  //           });
  //   });
  // }

}

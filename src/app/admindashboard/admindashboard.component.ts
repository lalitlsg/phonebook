import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit, OnDestroy {
  
  public messages: Array<any>;
  public chatBox: string;


  constructor(
    private socket:SocketService
  ) { 
        this.messages = [];
        this.chatBox = "";
  }

  ngOnInit() {
    this.socket.getEventListener().subscribe(event => {
      // console.log(event)
      if(event.type == "message") {
          // let data = event.data.content;
          // if(event.data.sender) {
          //     data = event.data.sender + ": " + data;
          // }
          this.messages.push(event.data);
          // console.log(this.messages)
      }
      // if(event.type == "close") {
      //     this.messages.push("/The socket connection has been closed");
      // }
      // if(event.type == "open") {
      //     this.messages.push("/The socket connection has been established");
      // }
  });

  }

  ngOnDestroy(){
        this.socket.close();
  }


  public send() {
    if(this.chatBox) {
        this.socket.send(this.chatBox);
        this.chatBox = "";
    }
}

public isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
}

}


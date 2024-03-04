import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angularApp';
  reactCounter: string; // Inicializamos el contador con '0'
  websocket: WebSocket;

  constructor() {
    this.reactCounter = "0";
    this.websocket = new WebSocket('ws://localhost:9001'); // Inicializamos websocket en el constructor
  }

  ngOnInit() {
    this.websocket.onopen = () => {
      console.log('Angular: WebSocket connection established');
    };

    this.websocket.onmessage = (event) => {
      console.log('Angular: Received message:', event.data);
      this.reactCounter = JSON.parse(event.data)?.counterUpdate;
    };

    this.websocket.onerror = (error) => {
      console.error('Angular: WebSocket error:', error);
    };

    this.websocket.onclose = () => {
      console.log('Angular: WebSocket connection closed');
    };
  }
}

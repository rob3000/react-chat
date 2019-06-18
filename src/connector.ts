
interface connection {

}

interface ConnectionData {
    data: object;
}


export default class Connector {

  connection = WebSocket.prototype;

  constructor() {

    this.connection = new WebSocket('ws://127.0.0.1:9876');
    this.connection.onopen = this.onopen;
    //this.connection.onmessage = this.onmessage;
    this.send = this.send.bind(this);

  };

  onopen() {
    console.log("Connection established!");
  };

  onmessage(e: ConnectionData) {

  };

  getId() {
    let id: number = Number(localStorage.getItem('userId'));

    if (!id) {
      id = Math.floor((Math.random() * 50) + 1);
      localStorage.setItem('userId', String(id));
    }

    return id;
  }

  send(message: string) {
    const date: Date = new Date();
    var data = {
      user: this.getId(),
      message: message,
      date: date.toISOString()
    };

    var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    this.connection.send(blob);
  }




}

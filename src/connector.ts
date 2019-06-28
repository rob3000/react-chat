import { AuthInterface } from 'auth';

interface connection {

}

interface ConnectionData {
    data: object;
}


export default class Connector {

  connection = WebSocket.prototype;
  auth: AuthInterface;

  constructor(auth: AuthInterface) {
    this.auth = auth;
    // @todo update to pull from .env
    this.connection = new WebSocket('ws://127.0.0.1:9876');
    this.connection.onopen = this.onopen;
    this.send = this.send.bind(this);

  };

  onopen() {
    // Look to add a better notification.
    console.log("Connection established!");
  };

  onmessage(e: ConnectionData) {

  };

  getId() {
    return this.auth.getAccessToken();
  }

  async send(message: string) {
    const date: Date = new Date();
    const profile = await this.auth.getProfile();
    var data = {
      user: this.getId(),
      message: message,
      date: date.toISOString(),
      picture: profile.picture
    };

    var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    this.connection.send(blob);
  }




}

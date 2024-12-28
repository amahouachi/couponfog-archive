import LocalStorage from "../service/LocalStorage";
import {Utils} from "../util/Utils";
import Message from "../util/Message";

export class Client {
  public id: string;
  private static _instance;

  private constructor(id) {
    this.id = id;
  }

  static getId(){
    return this._instance.id;
  }

  static create() {
    const client = new Client(Utils.uuid());
    LocalStorage.set("client_id", client.id);
    return client;
  }

  static async initialize() : Promise<void> {
    if (this._instance) {
      return this._instance;
    }
    let clientId = await LocalStorage.get("client_id");
    if (clientId) {
      this._instance = new Client(clientId);
    } else {
      this._instance = Client.create();
      //chrome.runtime.sendMessage(new Message(Message.ID_CREATE_CLIENT, this._instance.id));
    }
  }
}

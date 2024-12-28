export default class Message{
  
  public static ID_CLICKED_EXTENSION_ICON= "CLICKED_EXTENSION_ICON";
  public static ID_BROWSED_SUPPORTED_STORE= "BROWSED_SUPPORTED_STORE";
  public static ID_CREATE_CLIENT= "CREATE_CLIENT";
  public static ID_OPEN_AFFILIATE_TAB= "OPEN_AFFILIATE_TAB";
  public static ID_CREATE_SAVING= "CREATE_SAVING";

  public id: string;
  public data: any;
  
  constructor(id: string, data?: any) {
    this.id= id;
    this.data= data;
  }
}
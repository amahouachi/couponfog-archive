export default class LocalStorage{
  static async get(key: string): Promise<any>{
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (data) => {
         resolve(data[key]);
      });
    })
  }
  static async set(key: string, data: Object): Promise<any>{
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({[key]: data}, () => {
        //TODO maybe check if data written correctly
        resolve();
      });
    });
  }
  static clear(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      chrome.storage.local.clear(()=>{
        resolve();
      });
    });
  }
}

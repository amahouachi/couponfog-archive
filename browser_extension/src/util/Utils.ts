import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

export class Utils {
  static getTimeSince(timeStamp) {
    const now = new Date();
    const secondsPast = Math.floor(now.getTime()/1000) - timeStamp;
    let unit;
    let value;
    if(secondsPast < 60){
      unit= 'second';
      value= secondsPast;
    }else if(secondsPast < 3600){
      unit= 'minute';
      value= Math.floor(secondsPast/60);
    }else if(secondsPast <= 86400){
      unit= 'hour';
      value= Math.floor(secondsPast/3600);
    }else if(secondsPast <= 2592000){
      unit= 'day';
      value= Math.floor(secondsPast/86400);
    }
    if(!unit){
      return null;
    }
    let timeSince= `${value} ${unit}`;
    if(value>1){
      timeSince+= 's';
    }
    return timeSince;
  }
  static async sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
  }
  static async sleepMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  static getDomain(url) {
    var match = url.match(/(?:https?:\/\/)?(?:www[0-9]*\.)?([^/:?#]+)/i);
    if (match != null) {
      return match[1];
    } else {
      console.log("No domain for "+url);
      return null;
    }
  }
  static uuid(){
    return nanoid();
  }
  static serializeArray(form: HTMLFormElement) {
    const arr: Array<{name,value}>= [];
    if (!form || form.nodeName !== "FORM") {
      return arr;
    }
    for (const element of form.elements) {
      if (element['name'] === "") {
        continue;
      }
      switch (element.nodeName) {
        case 'INPUT':
          switch (element['type']) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
              arr.push({name: element['name'], value: element['value']})
              break;
            case 'checkbox':
            case 'radio':
              if (element['checked']) {
                arr.push({name: element['name'], value: element['value']});
              }
              break;
            case 'file':
              break;
          }
          break;
        case 'TEXTAREA':
          arr.push({name: element['name'], value: element['value']});
          break;
        case 'SELECT':
          switch (element['type']) {
            case 'select-one':
              arr.push({name: element['name'], value: element['value']});
              break;
            case 'select-multiple':
              for (const option of element['options']) {
                if (option.selected) {
                  arr.push({name: element['name'], value: option.value});
                }
              }
              break;
          }
          break;
        case 'BUTTON':
          switch (element['type']) {
            case 'reset':
            case 'submit':
            case 'button':
              arr.push({name: element['name'], value: element['value']});
              break;
          }
          break;
      }
    }
    return arr;
  }

}

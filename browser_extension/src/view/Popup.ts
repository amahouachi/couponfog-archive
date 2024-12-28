import {HtmlView} from "./HtmlView";
//import * as $ from 'jquery/dist/jquery.min';

export class Popup extends HtmlView {
  // @ts-ignore
  protected cfRoot: HTMLElement;
  public isOpen: boolean= false;
  public ready: Promise<void>;
  constructor(url: string) {
    super(url);
    this.ready= new Promise<void>(resolve => {
      this.loaded.then(() => {
        this.cfRoot= document.createElement('div');
        const shadowRoot = this.cfRoot.attachShadow({mode: 'open'});
        fetch(chrome.extension.getURL("css/app.css"), { method: 'GET' }).then(resp => resp.text()).then(css => {
          shadowRoot.innerHTML += `<style>${css}</style>`;
          shadowRoot.appendChild(this.$html);
          this.cfRoot.setAttribute('id','crContainer');
          this.cfRoot.setAttribute('style','all:initial');
          this.find('#cf-close')?.addEventListener('click',() => {
            this.close();
          });
          //$(this.cfRoot).append($('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("app.css") + '" >'));
//      $('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("app.css") + '" >').appendTo("head");
          // @ts-ignore
          const logo= this.find('#cf-logo-img') as HTMLImageElement;
          logo.src= chrome.runtime.getURL("images/cflogo.png");
          this.open();
          resolve();
        });
      })
    });
  }
  open() {
    document.body.append(this.cfRoot);
    this.isOpen= true;
  }
  close() {
    this.cfRoot.remove();
    this.isOpen= false;
  }
  toggle(){
    if(this.isOpen){
      this.close();
    }else{
      this.open();
    }
  }
}

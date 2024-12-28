//import * as $ from 'jquery/dist/jquery.min';
import validate = WebAssembly.validate;

export class HtmlView {
  public loaded: Promise<void>;
  public $html: Element;
  constructor(url) {
    const template = document.createElement('template');
    template.innerHTML = "<div></div>";
    this.$html= template.content.firstChild as Element;
    this.loaded= new Promise<void>(resolve => {
      fetch(chrome.extension.getURL(url))
        .then(response => {
          //const parser = new DOMParser();
          response.text().then(html => {
            template.innerHTML = html;
            this.$html= template.content.firstChild as Element;
            resolve();
          });
        });

    });
  }
  text(selector: string,text: string) {
    const element= this.find(selector);
    if(element){
      element.innerHTML= text;
    }
  }
  show(selector) {
    const element= this.find(selector);
    if(element){
      element.style.display= 'block';
    }
  }
  hide(selector) {
    const element= this.find(selector);
    if(element){
      element.style.display= 'none';
    }
  }
  append(selector, $html) {
    const element= this.find(selector);
    if(element){
      element.appendChild($html);
    }
  }
  find(selector): HTMLElement{
    return this.$html.querySelector(selector);
  }
  css(selector: string, styles: Array<{name: string, value: string}>){
    const element= this.find(selector);
    if(element){
      for(const s of styles){
        element.style[s.name]= s.value;
      }
    }
  }
  //Must give a html element to attach to
  //in order to avoid scrolling-after-focus issue
  copyToClipboard(text, rootElement: HTMLElement) {
    let activeElement= document.body;
    if(document.activeElement){
      activeElement= document.activeElement as HTMLElement;
    }
    const template = document.createElement('template');
    template.innerHTML = '<input type="text" name="tempCopyBuffer"/>';
    const copyBuffer= template.content.firstChild as HTMLInputElement;
    rootElement.append(copyBuffer);
    copyBuffer.value= text;
    copyBuffer.focus();
    copyBuffer.select();
    document.execCommand('copy');
    activeElement.focus();
    copyBuffer.remove();
  }
}

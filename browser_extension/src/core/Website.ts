import {Utils} from "../util/Utils";
//import * as $ from 'jquery/dist/jquery.min';
//NOTE: for firefox, need to clone dispatched events otherwise javascript listeners
//on the host page cannot access it (permission denied accessing event.target)
//https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.cloneInto

export class WebsiteSettings{
  public autoApplyEnabled: number= 0;
  public selectorCode: string= "";
  public selectorApplyCode: string= "";
  public selectorSubmitCode: string= "";
  public selectorRemoveCode: string= "";
  public selectorCheckoutTotal: string= "";
  public methodApplyCode: string= "click";
  public methodApplyCodeAsUser: string= "click";
  public checkoutAmountBase: number= 1;
  public waitBeforeCheckSuccess: number= 2000;
  public waitBeforeApplyNext: number= 1000;
  public waitAfterRemoveCode: number= 1000;
  public checkSuccessExpression: string= "";
  public checkoutUrlRegex: string= "";
  public scriptBeforeApplyCode: string= "";

  constructor(settings) {
    if(settings){
      for(const key of Object.keys(this)){
        if(settings[key]!==undefined){
          this[key]= settings[key];
        }
      }
    }
  }
}
export class Website {
  public settings: WebsiteSettings;
  constructor(extensionSettings) {
    this.settings= new WebsiteSettings(extensionSettings);
  }
  shouldShowAutoApply() {
    return this.settings
      && this.isAutoApplyEnabled()
      && this.isOnCheckoutPage(document.location.href)
      && this.isCheckoutPageStructureValid()
      && this.getCurrentTotal(document) > 0;
  }
  isAutoApplyEnabled() {
    if(this.settings){
      return this.settings.autoApplyEnabled;
    }
    return false;
  }
  isOnCheckoutPage(url: string) : boolean{
    if(!this.settings || !url){
      return false;
    }
    const checkoutUrlRegex= this.settings.checkoutUrlRegex;
    if(checkoutUrlRegex===""){
      return document.querySelector(this.settings.selectorCheckoutTotal)!=null;
    }
    if (url.match(checkoutUrlRegex)) {
      return true;
    }
    return false;
  }
  getCurrentTotal(checkoutPageHtml: Document) : number {
    if(!this.settings){
      return 0;
    }
    let checkoutAmount: number= 0;
    try{
      let checkoutAmountNode= checkoutPageHtml.querySelector(this.settings.selectorCheckoutTotal);
      let checkoutAmountText= checkoutAmountNode?.textContent;
      //let checkoutAmountText= $(checkoutPageHtml).find(this.settings.selectorCheckoutTotal).text();
      if(checkoutAmountText){
        let matches = checkoutAmountText.match(/\$([0-9\.,]+)/i);
        if(matches){
          let fixedAmountText= matches[1].replace(',', '');
          checkoutAmount= parseFloat((parseFloat(fixedAmountText)/this.settings.checkoutAmountBase).toFixed(2));
        }
      }
    }catch (e) {
    }
    return checkoutAmount;
  }
  isCheckoutPageStructureValid(){
    if(this.getCodeInput()!=null && this.getCheckoutTotalElement()!=null){
      if(this.settings.methodApplyCode==='click'){
        return this.getApplyCodeButton()!=null;
      }else{
        return this.getApplyCodeForm()!=null;
      }
    }
  }
  getCodeInput(): HTMLInputElement|null {
    const input= document.querySelector(this.settings.selectorCode) as HTMLElement|null;
    if(input && input instanceof HTMLInputElement){
      return input;
    }
    return null;
  }
  getApplyCodeButton(): HTMLElement|null{
    const button= document.querySelector(this.settings.selectorApplyCode) as HTMLElement|null;
    if(button){
      return button;
    }
    return null;
  }
  getApplyCodeForm(): HTMLFormElement|null{
    const form = document.querySelector(this.settings.selectorSubmitCode) as HTMLElement|null;
    if(form && form instanceof HTMLFormElement){
      return form as HTMLFormElement;
    }
    return null;
  }
  getCheckoutTotalElement(): HTMLElement|null{
    return document.querySelector(this.settings.selectorCheckoutTotal);
  }
  preApplyCode(code) {
    const input= this.getCodeInput();
    if(input){
      input.value=code;
      for(const event of ['input', 'change']){
        input.dispatchEvent(new Event(event, {bubbles:true}));
      }

    }
/*
    const $code= $(this.settings.selectorCode);
    $code[0].dispatchEvent(new Event('focus', {bubbles:true}));
    $code.val(code);
    for(const event of ['input', 'change']){
      $code[0].dispatchEvent(new Event(event, {bubbles:true}));
    }
    if(this.settings.scriptBeforeApplyCode!==""){
      //eval(this.settings.scriptBeforeApplyCode);
    }
*/
  }
  async postApplyCode() {
    try{
      if(this.settings.selectorRemoveCode!==""){
        const $remove= document.querySelector(this.settings.selectorRemoveCode);
        if($remove && $remove instanceof HTMLElement){
          $remove.click();
        }
      }
    }catch (e) {
    }
    await Utils.sleepMs(this.settings.waitAfterRemoveCode);
  }
  clickApplyButton() {
    const button= this.getApplyCodeButton();
    if(button){
      if(button instanceof HTMLButtonElement || button instanceof HTMLInputElement){
        if(button.disabled){
          button.disabled= false;
        }
      }
      button.click();
    }
  }
  async applyUsingClick() : Promise<number> {
    return new Promise(async(resolve) => {
      let currentTotal= 0;
      this.clickApplyButton();
      await Utils.sleepMs(this.settings.waitBeforeCheckSuccess);
      try{
        currentTotal= this.getCurrentTotal(document);
        await this.postApplyCode();
      }catch (e) {
        console.log(e);
      }
      resolve(currentTotal);
    });
  }
  async applyUsingForm() : Promise<number> {
    return new Promise<number>((async resolve => {
      let currentTotal= 0;
      let form = this.getApplyCodeForm();
      if(form){
        let formData= Utils.serializeArray(form);
        const applyBtnName= document.querySelector(this.settings.selectorApplyCode)?.getAttribute('name');
        const applyBtnValue= document.querySelector(this.settings.selectorApplyCode)?.getAttribute('value');
        if(applyBtnName && applyBtnValue){
          formData.push( { name: applyBtnName , value: applyBtnValue } );
        }
        const response= await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: formData.join('&')
        });
        if(response.ok){
          const checkoutPageHtml= await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(checkoutPageHtml, 'text/html');
          currentTotal= this.getCurrentTotal(doc);
          await this.postApplyCode();
        }
        resolve(currentTotal);
        /*
                $.post($form.action, $.param(formData))
                  .then( async (checkoutPageHtml) => {
                    currentTotal= this.getCurrentTotal(checkoutPageHtml);
                    await this.postApplyCode();
                    resolve(currentTotal);
                  });
        */

      }
    }));
  }
  async applyCode(code: string) : Promise<number> {
    this.preApplyCode(code);
    if(this.settings.methodApplyCode==="click"){
      return await this.applyUsingClick();
    }else{
      return await this.applyUsingForm();
    }
  }
  applyCodeAsUser(code: string) {
    this.preApplyCode(code);
    if(this.settings.methodApplyCodeAsUser==="click"){
      this.clickApplyButton();
    }else{
      let $form = <HTMLFormElement|null>document.querySelector(this.settings.selectorSubmitCode);
      $form?.submit();
    }
  }
}

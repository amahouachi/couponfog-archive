import Message from "./Message";

export default class BackgroundUtils{

    static sendMessageToTab(message: object, tabId: number|undefined){
        if(!tabId) return;
        chrome.tabs.sendMessage(tabId, message);
    }

    static sendMessageToActiveTab(message){
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            const activeTab = tabs[0];
            if(activeTab.id){chrome.tabs.sendMessage(activeTab.id, message);}
        });
    }

    static runContentScript(file: string, allFrames: boolean, frameId: number | undefined, callback?){
        chrome.tabs.executeScript({
            file,
            allFrames,
            frameId,
            runAt: "document_idle"
        }, callback);
    }
}
import SessionList from "../model/SessionList.js"

export default class SessionListView{
    constructor(sesList){
        this.myWorker;
        this.sesionList = sesList;
        this.data = "";
    }
    callWebWorker(list){
        if(window.Worker){
            this.myWorker = new Worker("js/view/task.js");
            console.log(this.sesionList.list);
            this.myWorker.postMessage(this.sesionList.list);    
            this.myWorker.onmessage = function(e){
                console.log(e.data);
                document.querySelector('#to-do').innerHTML = e.data;
            };
       }
    }
}
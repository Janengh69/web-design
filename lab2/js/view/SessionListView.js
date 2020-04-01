import SessionList from "../model/SessionList.js"

export default class SessionListView{
    constructor(sesList){
        this.myWorker;
        this.sesionList = sesList;
        this.data = "";
    }
    callWebWorker(list){
        if(window.Worker){
            this.myWorker = new Worker("js/view/taskForWebWorker.js");
            // console.log(list);
            this.myWorker.postMessage(list);    
            this.myWorker.onmessage = function(e){
                document.querySelector('#to-do').innerHTML = e.data;
            };
       }
    }
    showSum(sum){
        document.querySelector('#sumText').innerHTML = sum;

    }
}
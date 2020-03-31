import SessionList from "../model/SessionList.js"

export default class SessionListView{
    constructor(sesList){
        this.myWorker;
        this.sesionList = sesList;
        this.data = "";
    }
    ListToHtml() {
        const itemsHtml = this.sesionList.list.map( (item) => {
            return this.callWebWorker(item);
        }).join("");
        return `<table border="1"><tr><th>Title</th><th>ID</th><th>Time</th><th>StartTime</th><th>EndTime</th></tr>${itemsHtml}</table>`;
    }
    callWebWorker(item){
        var data;
        if(window.Worker){
            this.myWorker = new Worker("js/view/task.js");
            this.myWorker.postMessage(item);    
            this.myWorker.onmessage = function(e){
                console.log(e.data);
            };
       }
       console.log(data);
       return data;

    }
}
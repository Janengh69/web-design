import Timer from "../model/Timer.js"
import SessionList from "../model/SessionList.js";
import SessionListView from "../view/SessionListView.js";
export default class Controller{
    constructor(){
        this.myWorker;
        var timer = new Timer();
        var sesList = new SessionList();
        this.sesListView;

        document.getElementById("stop").addEventListener("click", () => timer.toggleClock(true));
        document.getElementById("pause").addEventListener("click", () => timer.toggleClock());
        document.getElementById("start").addEventListener("click", () => timer.startClock());
        document.getElementById("show").addEventListener("click", () => this.updateView(sesList, timer));

        this.path = 'localStorage';
    }
    updateView(sesList, timer) {
        timer.writeToJson(this.path);
        sesList.readFromJson(this.path);
        this.sesListView = new SessionListView(sesList);

        document.querySelector('#to-do').innerHTML = this.sesListView.ListToHtml();
    }
    
}
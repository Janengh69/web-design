import Timer from "../model/Timer.js"

export default class Controller{
    constructor(){
        var timer = new Timer();
        document.getElementById("submit").addEventListener("click", () => this.addTitle(timer));
        document.getElementById("stop").addEventListener("click", () => timer.toggleClock(true));
        document.getElementById("pause").addEventListener("click", () => timer.toggleClock());
        //document.getElementById("start").addEventListener("click", () =>timer.toggleClock());
        document.getElementById("start").addEventListener("click", () =>timer.startClock());


    }
    addTitle(timer) {
        timer.title = document.getElementById("title").value;

    }
}
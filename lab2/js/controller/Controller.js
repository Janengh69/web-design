import Timer from "../model/Timer.js"

export default class Controller{
    constructor(){
        var timer = new Timer();
       // document.getElementById("submit").addEventListener("click", () => this.saveTitle(timer));
        document.getElementById("stop").addEventListener("click", () => timer.toggleClock(true));
        document.getElementById("pause").addEventListener("click", () => timer.toggleClock());
        //document.getElementById("start").addEventListener("click", () =>timer.toggleClock());
        document.getElementById("start").addEventListener("click", () => timer.startClock());
        document.getElementById("generate").addEventListener("click", () => timer.writeToJson(this.path));
        document.getElementById("show").addEventListener("click", () => timer.readFromJson(this.path));
        this.path = 'localStorage';
    }
    // startClock(timer){
        
    // }
}
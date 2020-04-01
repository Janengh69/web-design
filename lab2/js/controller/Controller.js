import Timer from "../model/Timer.js"
import SessionList from "../model/SessionList.js";
import SessionListView from "../view/SessionListView.js";
export default class Controller{
    constructor(){
        this.myWorker;
        var timer = new Timer();
        var sesList = new SessionList();
        this.sesListView = new SessionListView();

        document.getElementById("stop").addEventListener("click", () => timer.toggleClock(true));
        document.getElementById("pause").addEventListener("click", () => timer.toggleClock());
        document.getElementById("start").addEventListener("click", () => timer.startClock());
        document.getElementById("show-all").addEventListener("click", () => this.updateView(sesList, timer));
        document.getElementById("day").addEventListener("click", () => this.updateView(sesList, timer, 1));
        document.getElementById("week").addEventListener("click", () => this.updateView(sesList, timer, 7));
        document.getElementById("month").addEventListener("click", () => this.updateView(sesList, timer, 30));
        document.getElementById("show-ses").addEventListener("click", () => this.updateView(sesList, timer, -1));
        document.getElementById("sum").addEventListener("click", () => this.getSum(sesList, timer));

        this.path = 'localStorage';
    }
    updateView(sesList, timer, button=0) {
        timer.writeToJson(this.path);
        sesList.readFromJson(this.path);
        let array_of_days = [];
        if(button == -1){
            array_of_days = this.showSessions(sesList, timer);
            sesList.list = this.getSessions(sesList.list, array_of_days);
        }
        else if(button != 0){
            array_of_days = this.LastDays(button);
            sesList.list = this.getSessions(sesList.list, array_of_days);

        }
       // sesList.list.push({ id: 10, title : "test", isSave: true, time : 0, startTime: new Date(2020, 3, 30), endTime:new Date(2020, 2, 28)} );
        this.sesListView = new SessionListView(sesList);
        this.sesListView.callWebWorker(sesList.list);
    }
    getSessions(list, dates){
        let result = [];
        let currDate = new Date();
        for(const elem in list){
            for(const el in dates){
                if( `${dates[el].month+1}/${dates[el].day}/${currDate.getFullYear()}`  == list[elem].startTime .split(",")[0]){
                    result.push(list[elem]);
                }
            }
        }
        return result;
    }
    getSum(sesList, timer){
        
        timer.writeToJson(this.path);
        sesList.readFromJson(this.path);
        this.sesListView = new SessionListView(sesList);

        let sum = timer.displayCurrentTimeLeftInSession(parseInt(timer.sumTime/1000));
        this.sesListView.showSum(sum);
    }
    showSessions(sesList, timer){
        let dates = document.getElementById("choose").value;
        dates = dates.split("-");
        if(dates.length != 2){
            alert("Wrong dates!");
        }
        else{
            let date1 = this.parseDate(dates[0]);
            let date2 = this.parseDate(dates[1]);

            var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            let days = this.LastDays(daysLag, date2);
            return days;
        }
    }
    parseDate(str) {
        var mdy = str.split('/');
        return new Date(new Date().getFullYear(), mdy[1]-1, mdy[0] );
    }
    LastDays (days, date = new Date()) {
        var result = [];
        for (var i=0; i<days; i++) {
            var d = date;

            d.setDate(d.getDate() - i);
            result.push({day : d.getDate(), month: d.getMonth()});
        }
        return result;
    }
}
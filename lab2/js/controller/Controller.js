import Timer from "../model/Timer.js"
import SessionList from "../model/SessionList.js";
import SessionListView from "../view/SessionListView.js";
export default class Controller{
    constructor(){
        this.myWorker;
        var timer = new Timer();
        var sesList = new SessionList([]);
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
        //THIS EXAMPLES ADDED TO SHOW THE WORK OF THE WEEK AND MONTH BUTTONS
        sesList.list.push({ id: 10, title : "test", isSave: true, time : "08:20", startTime: new Date(2020, 2, 30).toLocaleString(), endTime:new Date(2020, 2, 31).toLocaleString(), timeInMsec: 500000} );
        sesList.list.push({ id: 11, title : "test2", isSave: true, time : "00:02", startTime: new Date(2020, 2, 10).toLocaleString(), endTime:new Date(2020, 2, 28).toLocaleString(), timeInMsec: 2000} );
        sesList.list.push({ id: 12, title : "test3", isSave: true, time : "00:02", startTime: new Date(2020, 2, 10).toLocaleString(), endTime:new Date(2020, 2, 28).toLocaleString(), timeInMsec: 2000} );

        if(button == -1){
            array_of_days = this.showSessions(sesList, timer);
            sesList.list = this.getSessions(sesList.list, array_of_days);
        }
        else if(button != 0){
            array_of_days = this.LastDays(button);
            sesList.list = this.getSessions(sesList.list, array_of_days);
        }
        else{
            for(const elem in sesList.list){
                let flag = false;
                let temp = {day: new Date(sesList.list[elem].startTime).getDate(), month: new Date(sesList.list[elem].startTime).getMonth()};
                array_of_days.push(temp);
            }
            array_of_days = array_of_days.filter((obj, index, self) =>
                index === self.findIndex((t) => (
                    t.month === obj.month && t.day === obj.day
                ))
            )
        }
        this.sesListView = new SessionListView(sesList);
        this.sesListView.showHTML();

        this.callWebWorker(sesList.list, array_of_days, this.sesListView);
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
            const date = this.parseDate(dates[0], dates[1]);
            const date1 = date[0];
            const date2 = date[1];
            const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            return this.LastDays(daysLag, date2);;
        }
    }
    parseDate(str, str2) {
        var mdy = str.split('/');
        var mdy2 = str2.split('/');
        return [new Date(new Date().getFullYear(), mdy[1]-1, mdy[0]-1), new Date(new Date().getFullYear(), mdy2[1], mdy2[0]-1)];
    }
    LastDays (days, date = new Date()) {
        var result = [];
        let temp = new Date(date);
        for (var i=0; i<days; i++) {
            var d = new Date(date);
            d.setDate(d.getDate() - i);
            result.push({day : d.getDate(), month: d.getMonth()});
        }
        return result;
    }
    callWebWorker(sesList, array_of_days, sesListView){
        if(window.Worker){
            this.myWorker = new Worker("js/controller/taskForWebWorker.js");
            this.myWorker.postMessage([sesList, array_of_days]);    
            this.myWorker.onmessage = function(e){
                let arr = e.data;
                arr.filter((item, index) => arr.indexOf(item) == index);
                sesListView.timeToHTML(arr);
               
            };
       }
    }
}
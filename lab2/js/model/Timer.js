export default class Timer{
    constructor(){
        this.title = '';
        this.onChangeCallback = null;
        this.currentTime = 0;
        this.timer = document.querySelector('#timer');
        this.isClockRunning = false;
        this.isClockStopped = false;
        this.clockTimer;
        this.isSave = false;
        this.startTime = 0;
        this.endTime = 0;
        this.countStart = 0;
        this.list = [];
    }
    setOnChangeCallback(){
        this.onChangeCallback = onChangeCallback;
    }
    stopClock = () => {
        // setUpdatedTimers();
        // displaySessionLog(type);
        $("#title_form")[0].reset();
        clearInterval(this.clockTimer);
        this.isClockStopped = true;
        this.isClockRunning = false;
        this.currentTime = 0;
        this.displayCurrentTimeLeftInSession();
        this.isClockStopped = true;
        this.endTime = new Date();
        //this.writeToJson('localStorage');
        this.list.push({ title : this.title, time : this.clockTimer, startTime: this.startTime, endTime: this.endTime} );
    };
    toggleClock(reset){
       if (reset) {
          this.stopClock();
       } else {
            if (this.isClockStopped) {
            //setUpdatedTimers();
            this.isClockStopped = false;
            }
        
            if (this.isClockRunning === true) {
                console.log("pause");
                // pause
                clearInterval(this.clockTimer);
                this.isClockRunning = false;
                this.displayCurrentTimeLeftInSession();

            } else {
                // console.log("start");
                this.clockTimer = setInterval(() => {
                //stepDown();
                    this.currentTime++;
                    this.displayCurrentTimeLeftInSession();
                }, 1000);
                this.isClockRunning = true;
            }
            //    showStopIcon();
        }
    }
    displayCurrentTimeLeftInSession = () => {
        const secondsLeft = this.currentTime;
        let result = '';
        const seconds = secondsLeft % 60;
        const minutes = parseInt(secondsLeft / 60) % 60;
        let hours = parseInt(secondsLeft / 3600);
        function addLeadingZeroes(time) {
          return time < 10 ? `0${time}` : time
        }
        if (hours > 0) result += `${hours}:`
        result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
        this.timer.innerText = result.toString();
    }
    startClock = () =>{
        this.countStart++;
        if(this.countStart ==  1){
            this.isSave = $('#save:checked').prop('checked');
            this.startTime = new Date();
            this.saveTitle();
        }
        this.toggleClock();
    }
    saveTitle() {
        this.title = document.getElementById("title").value;
    }
    writeToJson = path =>{
        //var obj = { title : this.title, time : this.clockTimer, startTime: this.startTime, endTime: this.endTime}         
        localStorage.setItem(path, JSON.stringify(this.list));
        
      // console.log(data);
    }
    readFromJson = path =>{
        var obj = JSON.parse(localStorage.getItem(path));
        console.log(obj);
    }
}
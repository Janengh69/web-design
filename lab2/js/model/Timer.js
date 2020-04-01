export default class Timer{
    constructor(){
        this.title = '';
        this.currentTime = 0;
        this.timer = document.querySelector('#timer');
        this.isClockRunning = false;
        this.isClockStopped = false;
        this.startButton  = document.querySelector('#start');
        this.stopButton  = document.querySelector('#stop');
        this.pauseButton  = document.querySelector('#pause');
        this.setButtons(true);
        this.clockTimer;
        this.isSave = false;
        this.startTime = 0;
        this.endTime = 0;
        this.countStart = 0;
        this.list = [];
        this.time = 0;
        this.sumTime = 0;
    }
    setButtons(flag){
        this.stopButton.disabled = flag;
        this.pauseButton.disabled = flag;
    }
    stopClock = () => {
        $("#title_form")[0].reset();
        clearInterval(this.clockTimer);
        this.isClockStopped = true;
        this.isClockRunning = false;
        this.startButton.disabled = this.isClockRunning;
        this.setButtons(true);
        this.currentTime = 0;
        this.timer.innerText = this.displayCurrentTimeLeftInSession(this.currentTime);
        this.isClockStopped = true;
        this.endTime = new Date(Date.now());
        this.countStart = 0;
        this.time = this.endTime.getTime() - this.startTime.getTime();
        this.sumTime += this.time;
        this.time = this.displayCurrentTimeLeftInSession(parseInt(this.time/1000));

        this.list.push({ id: this.list.length, title : this.title, isSave: this.isSave, time : this.time , startTime: this.startTime.toLocaleString(), endTime: this.endTime.toLocaleString()} );
    };
    toggleClock(reset){
       if (reset) {
          this.stopClock();
       } else {
            if (this.isClockStopped) {
            this.isClockStopped = false;
            }
        
            if (this.isClockRunning === true) {
                clearInterval(this.clockTimer);
                this.isClockRunning = false;
                this.startButton.disabled = this.isClockRunning;

                this.timer.innerText =this.displayCurrentTimeLeftInSession(this.currentTime);

            } else {
                this.clockTimer = setInterval(() => {
                    this.currentTime++;
                    this.timer.innerText = this.displayCurrentTimeLeftInSession(this.currentTime);
                }, 1000);
                this.isClockRunning = true;
                this.startButton.disabled = this.isClockRunning;
                this.setButtons(false);
            }
        }
    }
    displayCurrentTimeLeftInSession = (currTime) => {
        console.log(currTime);
        let secondsLeft = currTime;
        let result = '';
        const seconds = secondsLeft % 60;
        const minutes = parseInt(secondsLeft / 60) % 60;
        let hours = parseInt(secondsLeft / 3600);
        function addLeadingZeroes(time) {
          return time < 10 ? `0${time}` : time
        }
        if (hours > 0) result += `${hours}:`
        result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`

        return result.toString();
    }
    startClock = () =>{
        this.countStart++;
        if(this.countStart ==  1){
            this.isSave = $('#save:checked').prop('checked');
            this.startTime = new Date(Date.now());
            this.saveTitle();
        }
        this.toggleClock();
    }
    saveTitle() {
        this.title = document.getElementById("title").value;
    }
    writeToJson = path =>{     
        localStorage.setItem(path, JSON.stringify(this.list));
    }
}
export default class Timer{
    constructor(){
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
        // type = "Work";
        // timeSpentInCurrentSession = 0;
      };
    toggleClock(reset){
       // togglePlayPauseIcon(reset);
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
                // update icon to the play one
                // set the value of the button to start or pause
                this.isClockRunning = false;
                this.displayCurrentTimeLeftInSession();

            } else {
            // start
                console.log("start");
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
        // add leading zeroes if it's less than 10
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
            this.isSave = $('#save:checked').val();
            console.log(this.isSave);
            this.startClock = new Date();
            console.log(this.startClock);
        }
        console.log("startClock");
        this.toggleClock();
    }
}
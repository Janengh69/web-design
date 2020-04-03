onmessage = function(e){
    let result = [];
    
    let totalTime = 0;
    let currDate = new Date();

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
      }
    for(const el in e.data[1]){
        let tempTime = '';
        totalTime = 0;
        for(const elem in e.data[0]){   
            if(`${e.data[1][el].month+1}/${e.data[1][el].day}/${currDate.getFullYear()}`  == e.data[0][elem].startTime .split(",")[0]){
                totalTime += e.data[0][elem].timeInMsec; 
            }
        }
        if(totalTime != 0){
            let temp = `${e.data[1][el].month+1}/${e.data[1][el].day}/${currDate.getFullYear()}`;
            totalTime = parseInt(totalTime/1000);
            const seconds = totalTime % 60;
            const minutes = parseInt(totalTime / 60) % 60;
            let hours = parseInt(totalTime / 3600);
            if (hours > 0) tempTime += `${hours}:`
            tempTime += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
            const obj = { date : temp, time: tempTime};
            result.push(obj);
        }
    }
    postMessage(result);

}
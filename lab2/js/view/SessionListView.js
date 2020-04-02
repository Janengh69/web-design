import SessionList from "../model/SessionList.js"

export default class SessionListView{
    constructor(sesList){
        this.myWorker;
        this.sesionList = sesList;
        this.data = "";
    }
    showSum(sum){
        document.querySelector('#sumText').innerHTML = sum;
    }
    tableToHtml(){
        // console.log(this.sesionList.list);
        const itemsHtml = this.sesionList.list.map( (item) => {
            if(item.isSave){
                return this.rowToHTMLWith(item);
            }else{
               return this.rowToHTML(item);
            }
        }).join("");
        return `<table border="1" class="table table-striped table-dark table-bordered "><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Time</th><th scope="col">StartTime</th><th scope="col">EndTime</th></tr>${itemsHtml}</table>`;
    }
    rowToHTMLWith(item){
        return  `
        <tr scope="row">
            <td>
                 ${item.id}                  
            </td>
            <td>
                ${item.title}
            </td>

            <td>
                ${item.time}
            </td>
            <td>
                ${item.startTime}
            </td>
            <td>
                ${item.endTime}
            </td>
        </tr>`;
    }
    rowToHTML(item){
        return `
        <tr scope="row">
            <td>
                ${item.title}
            </td>
            <td>
                ${item.id}                  
            </td>
            <td>
                ${item.time}
            </td>
            <td></td>
            <td></td>
        </tr>`;
    }
    showHTML(){
        document.querySelector('#to-do').innerHTML = this.tableToHtml();

    }
    timeToHTML(timeJson){
        document.querySelector('#sumTime').innerHTML = this.tableTimeToHTML(timeJson);
    }
    rowTimeToHTML(item){
        return `
        <tr scope="row">
            <td>
                ${item.date}
            </td>
            <td>
                ${item.time}                  
            </td>
        </tr>`;
    }
    tableTimeToHTML(timeJson){
       // const unique = new Set(timeJson);
        // console.log(unique);
        //const arr = [...unique];
        //timeJsom.filter((item, index) => timeJson.indexOf(item) == index);
        const itemsHtml = timeJson.map((item) => {
            return this.rowTimeToHTML(item);
     }).join("");
     return `<table border="1" class="table table-striped table-dark table-bordered "><tr><th scope="col">Date</th><th scope="col">TotalTime</th></tr>${itemsHtml}</table>`;
    }
}
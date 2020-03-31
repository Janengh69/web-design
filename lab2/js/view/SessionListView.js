import SessionList from "../model/SessionList.js"

export default class SessionListView{
    constructor(sesList){
        this.sesionList = sesList;
    }
    ListToHtml() {
        const itemsHtml = this.sesionList.list.map( (item) => {
            return this.ElementToHtml(item);
        }).join("");
        return `<table border="1"><tr><th>Title</th><th>ID</th><th>Time</th><th>StartTime</th><th>EndTime</th></tr>${itemsHtml}</table>`;
    }
    ElementToHtml(element) {
        const saveTime = (element.isSave) ? "saved" : "";
        if(element.isSave){
            return `
                <tr>
                    <td>
                        ${element.title}
                    </td>
                    <td>
                        ${element.id}                  
                    </td>
                    <td>
                        ${element.time}
                    </td>
                    <td>
                        ${element.startTime}
                    </td>
                    <td>
                        ${element.endTime}
                    </td>
                </tr>`;
        }else{
            return `
            <tr>
                <td>
                    ${element.title}
                </td>
                <td>
                    ${element.id}                  
                </td>
                <td>
                    ${element.time}
                </td>
            </tr>`;
         }
    }
}
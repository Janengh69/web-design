onmessage = function(e){
    const itemsHtml = e.data.map( (item) => {
        if(item.isSave){
            return  `
                <tr>
                    <td>
                        ${item.title}
                    </td>
                    <td>
                        ${item.id}                  
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
        }else{
            return `
            <tr>
                <td>
                    ${item.title}
                </td>
                <td>
                    ${item.id}                  
                </td>
                <td>
                    ${item.time}
                </td>
            </tr>`;
        }
    }).join("");
    postMessage( `<table border="1"><tr><th>Title</th><th>ID</th><th>Time</th><th>StartTime</th><th>EndTime</th></tr>${itemsHtml}</table>`);
}
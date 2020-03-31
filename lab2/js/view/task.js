onmessage = function(e){
    console.log(e.data.title);
    if(e.data.isSave){
        postMessage( `
            <tr>
                <td>
                    ${e.data.title}
                </td>
                <td>
                    ${e.data.id}                  
                </td>
                <td>
                    ${e.data.time}
                </td>
                <td>
                    ${e.data.startTime}
                </td>
                <td>
                    ${e.data.endTime}
                </td>
            </tr>`);
    }else{
        postMessage( `
        <tr>
            <td>
                ${e.data.title}
            </td>
            <td>
                ${e.data.id}                  
            </td>
            <td>
                ${e.data.time}
            </td>
        </tr>`);
     }
}
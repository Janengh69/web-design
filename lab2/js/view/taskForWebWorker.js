onmessage = function(e){
    const itemsHtml = e.data.map( (item) => {
        if(item.isSave){
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
        }else{
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
    }).join("");
    postMessage( `<table border="1" class="table table-striped table-dark table-bordered "><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Time</th><th scope="col">StartTime</th><th scope="col">EndTime</th></tr>${itemsHtml}</table>`);
}
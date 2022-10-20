 const btnShowMore = document.getElementById("btn-show-more");
 let count = 0;
 let elementClicked = false;


 
//This function will show 4 rows from API
function  showPopulation() {
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population").then((data) => {
        //convert to object    
        return data.json();
    }).then((objectData) => {
        let sourceName =  Object.values(objectData['source'].map(value =>  value['annotations'].source_name));
        let tableData = "";
   
     

        Object.values(objectData['data']).map((values) => {
            let btnId = 'btn_' +values[`ID Year`];
            let tblId = 'tbl_' +values[`ID Year`];
        
         
            count++;
            if(count <= 4){
            tableData += `
            <table>
            <thead>
            </thead>
            <tbody>
                <tbody class="labels">
			        <tr>
				        <td colspan="5">
                            <label >${values['ID Year']}  </label>
                            <button  id=${btnId} onClick="hideTable(this.id)"class="btn-label">+</button>
				           
                        </td>
			        </tr>
		        </tbody>
                <tbody id=${tblId} style="display:none;">
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Population</th>
                        <th scope="col">Source</th>
                    </tr>
                    <tr>
                        <td>${values.Nation}</td>
                        <td>${values.Population}</td>
                        <td>${sourceName}</td>
                    </tr>
                </tbody>
            </tbody>
            </table>
            </div>
            `;
            }  
            
        });
        document.getElementById("table").innerHTML = tableData;
    })
    
};

 
//This function will show all data from API
function  showAllPopulation() {
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population").then((data) => {
        //convert to object    
        return data.json();
    }).then((objectData) => {
        let sourceName =  Object.values(objectData['source'].map(value =>  value['annotations'].source_name));
        let tableData = "";
   
     

        Object.values(objectData['data']).map((values) => {
            let btnId = 'btn_' +values[`ID Year`];
            let tblId = 'tbl_' +values[`ID Year`];
           
            tableData += `
            <table>
            <thead>
            </thead>
            <tbody>
                <tbody class="labels">
			        <tr>
				        <td colspan="5">
                            <label >${values['ID Year']}  </label>
                            <button  id=${btnId} onClick="hideTable(this.id)"class="btn-label">+</button>
				           
                        </td>
			        </tr>
		        </tbody>
                <tbody id=${tblId} style="display:none;">
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Population</th>
                        <th scope="col">Source</th>
                    </tr>
                    <tr>
                        <td>${values.Nation}</td>
                        <td>${values.Population}</td>
                        <td>${sourceName}</td>
                    </tr>
                </tbody>
            </tbody>
            </table>
            </div>
            `;
            }  
            
        );
        btnShowMore.style.visibility='hidden';
        document.getElementById("table").innerHTML = tableData;
    })
 };

if(elementClicked == false){
    showPopulation();
}

function handleClick() { 
    elementClicked = true;
    showAllPopulation();
}
btnShowMore.addEventListener('click',handleClick);


//It will verify if table is hide or not
function hideTable(id){
    let lastId;
    

    let count = 0;
    if(count == 0){
        document.getElementById(id).innerHTML = "-";
        count++;
        lastId = id;
    } 
    if(count > 0 && lastId !== id ){
        document.getElementById(lastId).innerHTML = "+";

    }
    
      
    let tableId = id.replace("btn_", "tbl_");
    let table = document.getElementById(tableId);
    
    if (table.style.display === "none") {
        table.style.display = "";
     } else {
        table.style.display = "none";
    }
}

 
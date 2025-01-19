let sortDirection = false;
let spellData = [];

window.onload = () => {
    fetch('../content/data/spells.json')
        .then(response => response.json())
        .then(data => {
            spellData = data;
            loadTableData(spellData);
        });
}

function loadTableData(spellData) {
    const tableBody = document.getElementById('tableBody');
    let dataHTML = '';
    for (let data of spellData) {
        dataHTML += `<tr><td>${data.spellName}</td><td>${data.type}</td><td>${data.description}</td><td>${data.ManaDrain}</td><td>${data.damage}</td><td>${data.uses}</td></tr>`;
    }
    tableBody.innerHTML = dataHTML;
}

function sortColumn(columnName){
    sortDirection = !sortDirection;
    const dataType = typeof spellData[0][columnName];
    console.log(dataType);

    if(sortDirection){
        document.getElementById("arrow").innerHTML = `${columnName} &#8613;`;
    } else {
        document.getElementById("arrow").innerHTML = `${columnName} &#8615;`;
    }
    
    switch(dataType){
        case 'number':
            sortNumberColumn(sortDirection, columnName);
            break;
    }
    loadTableData(spellData);
}

function sortNumberColumn(sort, columnName){
    spellData = spellData.sort((p1, p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName];
    });
}
const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const rows=100;
const columns = 26;

function colGen(typeOfCell, tableRow, isInnerText) {
    for (let col = 0; col < columns; col++) {
        const cell = document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText = String.fromCharCode(col + 65);
        }
        tableRow.append(cell);
    }
}

colGen('th', tHeadRow, true);

// for (let col = 0; col < columns; col++) {
//     const th = document.createElement('th');
//     // col+65 -> ASCII character
//     th.innerText = String.fromCharCode(col + 65);
//     tHeadRow.append(th);
// }

for (let row = 1; row <= rows; row++) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.innerText=row;
    tr.append(th);
    // for(let col=0;col<columns;col++){
    //     const td=document.createElement('td');
    //     tr.append(td);
    // }
    colGen('td',tr,false);
    tBody.append(tr);
}
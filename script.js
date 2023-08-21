// excel dimensions
const rows=100;
const columns = 26;

// elements
const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const boldBtn = document.getElementById('bold-btn');
const currentCellHeading=document.getElementById('current-cell');

// variables to save cache
let prevCellId;
let currentCell;

function colGen(typeOfCell, tableRow, isInnerText, rowNumber) {
    for (let col = 0; col < columns; col++) {
        const cell = document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText = String.fromCharCode(col + 65);
            cell.setAttribute('id',String.fromCharCode(col + 65));
        }
        else{
            // cell.setAttribute('id','testing set ')
            cell.setAttribute('id',`${String.fromCharCode(col + 65)}${rowNumber}`);
            cell.setAttribute('contenteditable','true');
            // key and value
            cell.addEventListener('focus', event => onFocusFunction(event.target));
        }
        tableRow.append(cell);
    }
}

function setCellColor(colId,rowId,color){
    const colHead = document.getElementById(colId);
    const rowHead= document.getElementById(rowId);
    colHead.style.backgroundColor=color;
    rowHead.style.backgroundColor=color;
}

function onFocusFunction(cell){
    currentCell=cell;
    if(prevCellId){
        // const colHead = document.getElementById(prevCellId[0]);
        // const rowHead= document.getElementById(prevCellId.substring(1));
        // colHead.style.backgroundColor='transparent';
        // rowHead.style.backgroundColor='transparent';
        setCellColor(prevCellId[0],prevCellId.substring(1),'transparent');
    }
    currentCellHeading.innerText=cell.id + ' ' + 'selected';
    // const colHead = document.getElementById(cellId[0]);
    // const rowHead=document.getElementById(cellId.substring(1));
    // colHead.style.backgroundColor='#ddddff';
    // rowHead.style.backgroundColor='#ddddff';
    setCellColor(cell.id[0],cell.id.substring(1),'#ddddff');
    // here my cellId becomes prev cell id
    prevCellId=cell.id;
}

// here row is not required
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
    th.setAttribute('id',row);
    tr.append(th);
    // for(let col=0;col<columns;col++){
    //     const td=document.createElement('td');
    //     tr.append(td);
    // }
    // here row is required
    colGen('td',tr,false,row);
    tBody.append(tr);
}

boldBtn.addEventListener('click',()=>{
    console.log(currentCell.style.fontWeight);
    if(currentCell.style.fontWeight==='bold'){
        currentCell.style.fontWeight='normal';
    }
    else{
        currentCell.style.fontWeight='bold';
    }
})
// Q?
// Bold Button should show active state for bolded cell and non active
// for non bolded cell
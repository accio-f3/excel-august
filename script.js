// excel dimensions and constants
const rows=100;
const columns = 26;
const transparentBlue='#ddddff';
const transparent='transparent';

// excel components
const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const currentCellHeading=document.getElementById('current-cell');

// excel Buttons
const boldBtn = document.getElementById('bold-btn');
const italicsBtn = document.getElementById('italics-btn');
const underlineBtn = document.getElementById('underline-btn');
const leftBtn = document.getElementById('left-btn');
const centerBtn = document.getElementById('center-btn');
const rightBtn = document.getElementById('right-btn');

// excel dropdowns
const fontDropdown = document.getElementById('fonte-style-dropdown');

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

function buttonHighlter(currentCell, button, style, styleProperty) {
    if(currentCell.style[styleProperty]===style){
        button.style.backgroundColor=transparentBlue;
    }
    else{
        button.style.backgroundColor=transparent;
    }
}

// function buttonClickHandler(currentCell, button, style, toggleStyle, styleProperty) {
//     button.addEventListener('click',()=>{
//         if(currentCell.style[styleProperty]===style){
//             currentCell.style[styleProperty]=toggleStyle;
//             button.style.backgroundColor=transparent;
//         }
//         else{
//             currentCell.style[styleProperty]=style;
//             button.style.backgroundColor=transparentBlue;
//         }
//     })
// }

// buttonClickHandler(currentCell,boldBtn,'bold','normal','fontWeight');

function onFocusFunction(cell){
    currentCell=cell;
    // 
    if(prevCellId){
        // const colHead = document.getElementById(prevCellId[0]);
        // const rowHead= document.getElementById(prevCellId.substring(1));
        // colHead.style.backgroundColor=transparent;
        // rowHead.style.backgroundColor=transparent;
        setCellColor(prevCellId[0],prevCellId.substring(1),transparent);
    }
    // 
    // if(currentCell.style.fontWeight==='bold'){
    //     boldBtn.style.backgroundColor=transparentBlue;
    // }
    // else{
    //     boldBtn.style.backgroundColor=transparent;
    // }
    buttonHighlter(currentCell,boldBtn,'bold','fontWeight');
    // 
    // if(currentCell.style.fontStyle==='italic'){
    //     italicsBtn.style.backgroundColor=transparentBlue;
    // }
    // else{
    //     italicsBtn.style.backgroundColor=transparent;
    // }
    buttonHighlter(currentCell,italicsBtn,'italic','fontStyle');
    // 
    // if(currentCell.style.textDecoration==='underline'){
    //     underlineBtn.style.backgroundColor=transparentBlue;
    // }
    // else{
    //     underlineBtn.style.backgroundColor=transparent;
    // }
    // 
    buttonHighlter(currentCell,underlineBtn,'underline','textDecoration');
    // 
    currentCellHeading.innerText=cell.id + ' ' + 'selected';
    // const colHead = document.getElementById(cellId[0]);
    // const rowHead=document.getElementById(cellId.substring(1));
    // colHead.style.backgroundColor=transparentBlue;
    // rowHead.style.backgroundColor=transparentBlue;
    setCellColor(cell.id[0],cell.id.substring(1),transparentBlue);
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
    if(currentCell.style.fontWeight==='bold'){
        currentCell.style.fontWeight='normal';
        boldBtn.style.backgroundColor=transparent;
    }
    else{
        currentCell.style.fontWeight='bold';
        boldBtn.style.backgroundColor=transparentBlue;
    }
})

italicsBtn.addEventListener('click',()=>{
    if(currentCell.style.fontStyle==='italic'){
        currentCell.style.fontStyle='normal';
        italicsBtn.style.backgroundColor=transparent;
    }
    else{
        currentCell.style.fontStyle='italic';
        italicsBtn.style.backgroundColor=transparentBlue;
    }
})
// buttonClickHandler(currentCell,boldBtn,'bold','normal','fontWeight');

underlineBtn.addEventListener('click',()=>{
    if(currentCell.style.textDecoration==='underline'){
        currentCell.style.textDecoration='none';
        underlineBtn.style.backgroundColor=transparent;
    }
    else{
        currentCell.style.textDecoration='underline';
        underlineBtn.style.backgroundColor=transparentBlue;
    }
})
// buttonClickHandler(currentCell,boldBtn,'bold','normal','fontWeight');

leftBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
})

rightBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
})

centerBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='center';
})

fontDropdown.addEventListener('change',()=>{
    currentCell.style.fontFamily=fontDropdown.value;
})

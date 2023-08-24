// excel dimensions and constants
const rows=100;
const columns = 26;
const transparentBlue='#ddddff';
const transparent='transparent';
const arrMatrix='arrMatrix';

// excel components
const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const currentCellHeading=document.getElementById('current-cell');
// <h1 id="sheet-no">Sheet No - 1</h1>
const sheetNo = document.getElementById('sheet-no');
const buttonContainer = document.getElementById('button-container');

// excel Buttons
const boldBtn = document.getElementById('bold-btn');
const italicsBtn = document.getElementById('italics-btn');
const underlineBtn = document.getElementById('underline-btn');
const leftBtn = document.getElementById('left-btn');
const centerBtn = document.getElementById('center-btn');
const rightBtn = document.getElementById('right-btn');
const cutBtn = document.getElementById('cut-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const uploadInput = document.getElementById('upload-input');
const addSheetButton=document.getElementById('add-sheet-btn');
// DIY
const saveSheetButton = document.getElementById('save-sheet-btn');

// color inputs
const bgColorSelector=document.getElementById('bgColor');
const fontColorSelector=document.getElementById('fontColor');

// excel dropdowns
const fontFamilyDropdown = document.getElementById('fonte-style-dropdown');
const fontSizeDropdown = document.getElementById('fonte-size-dropdown');

// variables to save cache
let prevCellId;
let currentCell;
let cutCell;
let lastPressedBtn;
let numSheets = 1;
let currentSheet = 1;
let prevSheet;
let matrix = new Array(rows);
createNewMatrix();
// 
// button creation of firstRender
if(localStorage.getItem(arrMatrix)){
    for (let i = 1; i < JSON.parse(localStorage.getItem(arrMatrix)).length; i++) {
        genNextButtonFn(true);
    }
}

//
function createNewMatrix() {
    for (let row = 0; row < rows; row++) {
        matrix[row] = new Array(columns);
        for (let col = 0; col < columns; col++) {
            matrix[row][col] = {};
        }
    }
}

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
            cell.addEventListener('focusout', updateObjectInMatrix);
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

function buttonClickHandler(currentCell, button, style, toggleStyle, styleProperty) {
    if (currentCell.style[styleProperty] === style) {
        currentCell.style[styleProperty] = toggleStyle;
        button.style.backgroundColor = transparent;
    }
    else {
        currentCell.style[styleProperty] = style;
        button.style.backgroundColor = transparentBlue;
    }
    updateObjectInMatrix();
}

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

function updateObjectInMatrix(){
    let id = currentCell.id;
    let tempObj={
        id: id,
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    let col=id[0].charCodeAt(0)-65;
    let row=id.substr(1)-1;
    matrix[row][col]=tempObj;
}

// here rowNo is not required
colGen('th', tHeadRow, true);
tableBodyGen();
if(localStorage.getItem(arrMatrix)){
    matrix=JSON.parse(localStorage.getItem(arrMatrix))[0];
    renderMatrix();
}

// for (let col = 0; col < columns; col++) {
//     const th = document.createElement('th');
//     // col+65 -> ASCII character
//     th.innerText = String.fromCharCode(col + 65);
//     tHeadRow.append(th);
// }

function tableBodyGen(){
    tBody.innerHTML='';
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
}

// boldBtn.addEventListener('click',()=>{
//     if(currentCell.style.fontWeight==='bold'){
//         currentCell.style.fontWeight='normal';
//         boldBtn.style.backgroundColor=transparent;
//     }
//     else{
//         currentCell.style.fontWeight='bold';
//         boldBtn.style.backgroundColor=transparentBlue;
//     }
// })

boldBtn.addEventListener('click', () => buttonClickHandler(currentCell, boldBtn, 'bold', 'normal', 'fontWeight'));

italicsBtn.addEventListener('click', () => buttonClickHandler(currentCell, italicsBtn, 'italic', 'normal', 'fontStyle'));

// italicsBtn.addEventListener('click',()=>{
//     if(currentCell.style.fontStyle==='italic'){
//         currentCell.style.fontStyle='normal';
//         italicsBtn.style.backgroundColor=transparent;
//     }
//     else{
//         currentCell.style.fontStyle='italic';
//         italicsBtn.style.backgroundColor=transparentBlue;
//     }
// })
underlineBtn.addEventListener('click', () => buttonClickHandler(currentCell, underlineBtn, 'underline', 'none', 'textDecoration'));

// underlineBtn.addEventListener('click',()=>{
//     if(currentCell.style.textDecoration==='underline'){
//         currentCell.style.textDecoration='none';
//         underlineBtn.style.backgroundColor=transparent;
//     }
//     else{
//         currentCell.style.textDecoration='underline';
//         underlineBtn.style.backgroundColor=transparentBlue;
//     }
// })

leftBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
    updateObjectInMatrix();
})

rightBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
    updateObjectInMatrix();
})

centerBtn.addEventListener('click',()=>{
    currentCell.style.textAlign='center';
    updateObjectInMatrix();
})

fontFamilyDropdown.addEventListener('change',()=>{
    currentCell.style.fontFamily=fontFamilyDropdown.value;
    updateObjectInMatrix();
})

fontSizeDropdown.addEventListener('change',()=>{
    currentCell.style.fontSize=fontSizeDropdown.value;
    updateObjectInMatrix();
})

// input has better UX and but input is very heavy event Listener
bgColorSelector.addEventListener('input',()=>{
    currentCell.style.backgroundColor=bgColorSelector.value;
    updateObjectInMatrix();
});

fontColorSelector.addEventListener('change',()=>{
    currentCell.style.color=fontColorSelector.value;
    updateObjectInMatrix();
})

cutBtn.addEventListener('click',()=>{
    lastPressedBtn='cut';
    cutCell={
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    currentCell.innerText='';
    currentCell.style.cssText='';
    updateObjectInMatrix();
    // style -> it's an object which stores all the properties in an object
    // cssText -> property of style object which saves my style properties
    // in text (short form of style)
})

copyBtn.addEventListener('click',()=>{
    lastPressedBtn='copy';
    cutCell={
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    // style -> it's an object which stores all the properties in an object
    // cssText -> property of style object which saves my style properties
    // in text (short form of style)
})

pasteBtn.addEventListener('click',()=>{
    currentCell.innerText = cutCell.text;
    currentCell.style = cutCell.style;
     // you can pass
    // cssText to style
    if(lastPressedBtn==='cut'){
        cutCell = undefined;
    }
    updateObjectInMatrix();
})

uploadInput.addEventListener('input',uploadMatrix);

function renderMatrix(){
    matrix.forEach(row=>{
        row.forEach(cellObj=>{
            if(cellObj.id){
                let currentCell=document.getElementById(cellObj.id);
                // currentCell is my html obj, cellObj is js object
                currentCell.innerText=cellObj.text;
                // I can pass cssText to style, internally it's handling
                currentCell.style=cellObj.style;
            }
        })
    })
}

// matrix -> [{},{},{},{},{}];

function viewSheet(event){
    prevSheet=currentSheet;
    currentSheet=event.target.id.split('-')[1];
    let matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
    // it should save previous sheet into arrMatrix
    // matrix -> ✅, prevsheet -> ❌
    // updatingMatrix with latest matrix in matrixArr
    // matrixArr=[matrix1,matrix2,matrix3]
    matrixArr[prevSheet-1]=matrix;
    localStorage.setItem(arrMatrix,JSON.stringify(matrixArr));
    // it's very to update my virtual memory
    matrix=matrixArr[currentSheet-1];
    tableBodyGen();
    renderMatrix();
    sheetNo.innerText=`Sheet No - ${currentSheet}`;
}

function genNextButtonFn(firstRender){
    // add sheet button
    const btn = document.createElement('button');
    numSheets++;
    if(!firstRender){
        prevSheet=currentSheet;
        currentSheet=numSheets;
    }
    btn.innerText=`Sheet ${numSheets}`;
    btn.setAttribute('id',`sheet-${numSheets}`);
    btn.setAttribute('onclick','viewSheet(event)');
    buttonContainer.append(btn);
}

function saveMatrix(){
    if(localStorage.getItem(arrMatrix)){
        let tempMatrixArr = JSON.parse(localStorage.getItem(arrMatrix));
        tempMatrixArr.push(matrix);
        localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));
    }
    else{
        let tempMatrixArr = [matrix];
        localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));
    }
}

addSheetButton.addEventListener('click',()=>{
    genNextButtonFn(false);
    sheetNo.innerText=`Sheet No - ${currentSheet}`;
    // arrMatrix -> array of matrix
    saveMatrix();
    createNewMatrix();
    tableBodyGen();
});

function dowloadMatrix(){
    const matrixString = JSON.stringify(matrix);
    // memory out of my matrixString
    const blob = new Blob([matrixString], { type: 'application/json' });

    // i have my memory which is formed out of matrixString;
    const link = document.createElement('a');
    // convert my blob to link href (URL)
    link.href = URL.createObjectURL(blob);
    link.download='table.json';
    // matrix->stringify->blob->URL
    link.click();
}

function uploadMatrix(event) {
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.readAsText(file); // this is the trigger
        // this reader should convert my blob into js code
        reader.onload = function(event){
            const fileContent = JSON.parse(event.target.result);
            matrix=fileContent;
            renderMatrix();
        }
        // reader is inbuild instance of my FileReaderClass
    }
}

// render uploaded file
// add sheet
// sketch board

// download and upload of sheets
// and addition of sheets

// 1st approach

// let twoDMatrix=[
//     [{},{},{}],
//     [{},{},{}],
//     [{},{},{}],
//     [{},{},{}],
// ];

// row * col
// 100 * 26

// 1st approach nested loops to store each and every cell
// A1 -> A & 1

// colRow -> excel address of cell

// twoDMatrix[col][row] -> ❌
// twoDMatrix[row][col] -> ✅
// 
// 0,0 -> row,col
// 1, A
// -1, asciiNumber(A) -65;

// currentCell gets changed -> respective object in matrix
// updateCell();

// add sheet button notes
// save my matrix data somewhere -> localstorage
// array of matrix
// cleanup matrix
// cleanup table
// update current sheet no -> ✅
// update total number of sheets -> ✅
// create button for the new sheet -> ✅

// complete upload fn

// matrix 1 -> should be saved
// matrix 2 -> should be saved
// matrxArr=[matrix1,matrix2]


// things left rendering matrix data (used at 2 places)
// save matrix function
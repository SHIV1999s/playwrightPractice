const excej=require('exceljs')

const workbook=new excej.Workbook();
async function readExcel(sheet,selectedString){
    const obj={rowNumber:0,cellNumber:0}
    sheet.eachRow((row,rnumber)=>{
        row.eachCell((cell,cnumber)=>{
            if(cell.value==selectedString){
                    obj.rowNumber=rnumber,
                    obj.cellNumber=cnumber
            }
        })
    });
    return obj;
}
async function writeExcel(selectedString,updatedString,filePath,sheetName,updateIndex={rowIncrease:0,cellIncrease:0}){
    //'tests/eCommerceAutomation/excelAutomation/download.xlsx'
    await workbook.xlsx.readFile(filePath,selectedString);
    const sheet=workbook.getWorksheet(sheetName);
    const path=await readExcel(sheet,selectedString);
    const cell=sheet.getCell(path.rowNumber,path.cellNumber+updateIndex.cellIncrease);
    cell.value=updatedString
    await workbook.xlsx.writeFile(filePath)
}

module.exports={writeExcel}
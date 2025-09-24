const XLSX = require("xlsx");
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  const sheetData = {};
  sheetNames.forEach((sheetName) => {
    sheetData[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  });
  return sheetData;
}

module.exports = { readExcel };

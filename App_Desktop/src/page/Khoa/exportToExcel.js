import * as XLSX from 'xlsx';

export function exportToExcel(tableId, fileName) {
    // Lấy ra bảng dữ liệu cần xuất ra Excel
    const table = document.getElementById(tableId);

    // Extract the header row and the data rows from the table
    const rows = Array.from(table.querySelectorAll('tr'));
    const header = Array.from(rows[0].querySelectorAll('th'));
    const data = rows.slice(1).map((row) => {
        // Exclude the first cell in each row
        const cells = Array.from(row.querySelectorAll('td'));
        return cells.slice(1).map((cell) => cell.innerText);
    });

    // Create a new Excel workbook
    const wb = XLSX.utils.book_new();

    // Create a new sheet from the data
    const ws = XLSX.utils.aoa_to_sheet([
        header.slice(1).map((cell) => cell.innerText), // Exclude the first header cell
        ...data,
    ]);

    // Append the sheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write the workbook to a file and download it
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

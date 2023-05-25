import * as XLSX from 'xlsx';

export function exportToExcel(tableId, fileName) {
    // Lấy ra bảng dữ liệu cần xuất ra Excel
    const table = document.getElementById(tableId);

    // Lấy ra các hàng và cột trong bảng dữ liệu
    const rows = Array.from(table.querySelectorAll('tr'));
    const header = Array.from(rows[0].querySelectorAll('th'));
    const data = rows.slice(1).map((row) => Array.from(row.querySelectorAll('td')));

    // Tạo đối tượng workbook mới
    const wb = XLSX.utils.book_new();

    // Tạo sheet mới từ dữ liệu của bảng
    const ws = XLSX.utils.aoa_to_sheet([
        header.map((cell) => cell.innerText),
        ...data.map((row) => row.map((cell) => cell.innerText)),
    ]);

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Tạo file Excel và tải xuống
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}
